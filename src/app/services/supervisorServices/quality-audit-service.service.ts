/* 
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/


import { Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
import { InterceptedHttp } from './../../http.interceptor';

@Injectable()
export class QualityAuditService {
  
       

    commonBaseURL: any;
    admin_Base_Url: any;
    _104baseUrl: any;
    force_logout_url: any = '';
    getServicesUrl: any = '';
    getRolesUrl: any = '';
    getServiceProviderID_url: any = '';
    _calltypesurl: any = '';
    filterCallListUrl: any = '';
    getCallSummaryUrl: any = '';
    getAllAgents_Url: any = '';
    getRoleSpecificAgentIDs_url: any = '';


    // new apis for casesheet
    getBenCaseSheet_url: any = '';
    getBloodRequestDetails_url: any = '';
    getEpidemicOutbreakComplaintDetails_url: any = '';
    getFoodSafetyComplaintDetails_url: any = '';
    getOrganDonationRequestDetails_url: any = '';
    getDirectoryServices_url: any;
    getGrievanceService_url: any;
    audioURL: any;
    covidVaccinationStatusUrl: any;


    constructor(
        private _config: ConfigService,
        private httpIntercept: InterceptedHttp) {
        this.commonBaseURL = this._config.getCommonBaseURL();
        this.admin_Base_Url = this._config.getAdminBaseURL();
        this._104baseUrl = this._config.get104BaseURL();

        this.getServicesUrl = this.admin_Base_Url + 'm/role/serviceNew';
        this.getRolesUrl = this.commonBaseURL + 'user/getRolesByProviderID';
        this.getServiceProviderID_url = this.admin_Base_Url + 'getServiceProviderid';
        this._calltypesurl = this.commonBaseURL + 'call/getCallTypesV1';
        this.filterCallListUrl = this.commonBaseURL + 'call/filterCallList';
        // this.getCallSummaryUrl = this._104baseUrl + 'services/getCaseSheet';
        // this.getAllAgents_Url = this.admin_Base_Url + 'getAllAgentIds';
        this.getRoleSpecificAgentIDs_url = this.commonBaseURL + 'user/getAgentByRoleID';


        this.getBenCaseSheet_url = this._104baseUrl + 'beneficiary/getBenCaseSheet';
        this.getBloodRequestDetails_url = this._104baseUrl + 'beneficiary/get/bloodRequestDetails';
        this.getEpidemicOutbreakComplaintDetails_url = this._104baseUrl + 'beneficiary/get/epidemicOutbreakComplaint';
        this.getFoodSafetyComplaintDetails_url = this._104baseUrl + 'beneficiary/get/foodComplaintDetails';
        this.getOrganDonationRequestDetails_url = this._104baseUrl + 'beneficiary/get/organDonationRequestDetails';
        this.getDirectoryServices_url = this._104baseUrl + "beneficiary/getdirectorySearchHistory";
        this.getGrievanceService_url = this.commonBaseURL + "feedback/getFeedbacksList"
        this.audioURL =  this.commonBaseURL+"call/getFilePathCTI";
        this.covidVaccinationStatusUrl = this.commonBaseURL + 'covid/getCovidVaccinationDetails'
    }
   
    getServices(userID) {
        return this.httpIntercept.post(this.getServicesUrl,
            { 'userID': userID })
            .map(this.handleState_n_ServiceSuccess).catch(this.handleError);
    }

    getRoles(obj) {
        return this.httpIntercept.post(this.getRolesUrl, obj)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    getServiceProviderID(providerServiceMapID) {
        return this.httpIntercept.post(this.getServiceProviderID_url, { 'providerServiceMapID': providerServiceMapID })
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    getCallTypes(providerServiceMapID) {
        return this.httpIntercept.post(this._calltypesurl,
            { 'providerServiceMapID': providerServiceMapID })
            .map(this.handleSuccess).catch(this.handleError);
    }

    getCallrecordingWorklist(obj) {
        return this.httpIntercept.post(this.filterCallListUrl, obj)
            .map(this.handleSuccess)
            .catch(this.handleError);
    }

    // getCallSummary(benCallID) {
    //     return this.httpIntercept.post(this.getCallSummaryUrl,
    //         {
    //             'benCallID': benCallID,
    //             'is1097': true
    //         })
    //         .map(this.handleSuccess)
    //         .catch(this.handleError);
    // }

    getAllAgents(providerServiceMapID) {
        return this.httpIntercept
            .post(this.getRoleSpecificAgentIDs_url,
            { 'providerServiceMapID': providerServiceMapID })
            .map(this.handleSuccess)
            .catch(this.handleError)
    }

    getRoleSpecificAgents(providerServiceMapID, roleID) {
        return this.httpIntercept
            .post(this.getRoleSpecificAgentIDs_url,
            {
                'providerServiceMapID': providerServiceMapID,
                'RoleID': roleID
            })
            .map(this.handleSuccess)
            .catch(this.handleError)
    }

    getBenCaseSheet(benCallID) {
        return this.httpIntercept.post(this.getBenCaseSheet_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }

    getBloodRequestDetails(benCallID) {
        return this.httpIntercept.post(this.getBloodRequestDetails_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }

    getEpidemicOutbreakComplaintDetail(benCallID) {
        return this.httpIntercept.post(this.getEpidemicOutbreakComplaintDetails_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }

    getFoodSafetyComplaintDetails(benCallID) {
        return this.httpIntercept.post(this.getFoodSafetyComplaintDetails_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }

    getOrganDonationRequestDetails(benCallID) {
        return this.httpIntercept.post(this.getOrganDonationRequestDetails_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }

    getDirectoryServicesResponse(benCallID) {
        return this.httpIntercept.post(this.getDirectoryServices_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }
    getGrievanceServicesResponse(benCallID) {
        return this.httpIntercept.post(this.getGrievanceService_url,
            {
                'benCallID': benCallID
            }).map(this.handleSuccess).catch(this.handleError);
    }

  
    getAudio(agentid,sessionID) {
        return this.httpIntercept.post(this.audioURL,
            {
                'agentID': agentid,
                'callID': sessionID
            }).map(this.handleSuccess).catch(this.handleError);
    }
getCovidVaccinationStatus(benRegID) {
    return this.httpIntercept.post(this.covidVaccinationStatusUrl, benRegID)

    .map(this.handleSuccessCovidVaccine)
    .catch(this.handleError)
}
    handleSuccess(response: Response) {
        if (response.json().data) {
            return response.json().data;
        } else {
            return Observable.throw(response.json());
        }
    }
    handleSuccessCovidVaccine(response: Response) {
        if (response.json()) {
            return response.json();
        } else {
            return Observable.throw(response.json());
        }
    }
    handleState_n_ServiceSuccess(response: Response) {
        let result = [];
        result = response.json().data.filter(function (item) {
            if (item.statusID !== 4) {
                return item;
            }
        });
        return result;
    }

    private handleError(error: Response | any) {
        return Observable.throw(error.json());
    };
   
 
}