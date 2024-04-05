import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export enum UrlObj {
  UnKnown,
  MsgSumPivoteTableComponent,
 
}

const API_URL: string = environment.api_url;
@Injectable({
  providedIn: 'root'
})


export class MessagesService {
  constructor(private httpClient: HttpClient) { }
  readAll(): Observable<any> {
    return  this.httpClient.get(API_URL + '/?limit=1000');
  }
  read(id: number): Observable<any> {
    return this.httpClient.get(`${API_URL}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.httpClient.post(API_URL, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/${id}`);
  }

  getCmsTemlateReport(): Observable<any> {
    return this.httpClient.get(`${API_URL}/cms_template`);
  }
  getCmsTemlateCreateReport(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/cms_template`,data);
  }
  getCmsTemlateWaComponentCreateReport(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/cms_template`,data);
  }
  cmsUpdateTemplateReport(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/cms_template/${id}`, data);
  }
  cmsDeleteTemplateReport(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/cms_template/${id}`);
  }

  getCmsComponentsReport(): Observable<any> {
    return this.httpClient.get(`${API_URL}/cms_components`);
  }
  getCmsComponentCreateReport(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/cms_components`,data);
  }
  cmsUpdateComponentReport(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/cms_components/${id}`, data);
  }
  cmsDeleteComponentReport(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/cms_components/${id}`);
  }
  getCmsTempWaCompParamsReport(): Observable<any> {
    return this.httpClient.get(`${API_URL}/cms_temp_wa_comp_params`);
  }
  cmsTempWaCompParamsCreate(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/cms_temp_wa_comp_params`,data);
  }
  cmsTempWaCompParamsUpdate(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/cms_temp_wa_comp_params/${id}`, data);
  }
  cmsTempWaCompParamsDelete(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/cms_temp_wa_comp_params/${id}`);
  }
  getCmsTempWaCompHeaderParamsReport(): Observable<any> {
    return this.httpClient.get(`${API_URL}/cms_temp_wa_comp_header_params`);
  }
  cmsTempWaCompHeaderParamsCreate(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/cms_temp_wa_comp_header_params`,data);
  }
  cmsTempWaCompHeaderParamsUpdate(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/cms_temp_wa_comp_header_params/${id}`, data);
  }
  cmsTempWaCompHeaderParamsDelete(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/cms_temp_wa_comp_header_params/${id}`);
  }
  getUserDetails(name: string): Observable<any> {
    return this.httpClient.get(`${API_URL}/user_web_manage/${name}`);
  }
  updateUserDetails(data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/user_web_manage/`, data);
  }
  getMessageSummaryReport(date: string): Observable<any> {
    return this.httpClient.get(`${API_URL}/message_summary/${date}`);
  }
  getWaCampaignScheduleDataSummaryReport(date: any): Observable<any> {
    return this.httpClient.get(`${API_URL}/wa_campaign_schedule_data_summ/${date}`);
  }
  getWaCampaignDataSummaryReport(date: any): Observable<any> {
    return this.httpClient.get(`${API_URL}/wa_campaign_data_summ/${date}`);
  }
  getOutMsgSummReport(date:string): Observable<any> {
    return this.httpClient.get(`${API_URL}/out_message_summ/${date}`);
  }
  getInMsgSummReport(date:string): Observable<any> {
    return this.httpClient.get(`${API_URL}/in_message_summ/${date}`);
  }
  getOutStatusSummReport(date:string): Observable<any> {
    return this.httpClient.get(`${API_URL}/out_status_summ/${date}`);
  }
  getWaBlockReport(): Observable<any> {
    return this.httpClient.get(`${API_URL}/wa_block`);
  }
  getWaBlockCreateReport(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/wa_block`,data);
  }
  waBlockUpdateReport(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/wa_block/${id}`, data);
  }
  waBlockDeleteReport(id: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/wa_block/${id}`);
  }
  getGreetflowReport(): Observable<any> {
    return this.httpClient.get(`${API_URL}/greetflow`);
  }
  getGreetFlowSubapp(subapp_name:any): Observable<any> {
    //https://192.168.1.186:8110/v1/greetflow/?query=subappname%3Adnsbank&fields=LevelName
    return this.httpClient.get(`${API_URL}/greetflow/?query=subappname%3A${subapp_name}`);
  }
  getLevelNames(subapp_name:any): Observable<any> {
    //https://192.168.1.186:8110/v1/greetflow/?query=subappname%3Adnsbank&fields=LevelName
    return this.httpClient.get(`${API_URL}/greetflow/?query=subappname%3A${subapp_name}&fields=LevelName`);
  }
  getGreetflowCreateReport(data:any): Observable<any> {
    return this.httpClient.post(`${API_URL}/greetflow`,data);
  }
  greetflowUpdateReport(slno: number, data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/greetflow/${slno}`, data);
  }
  greetflowDeleteReport(slno: number): Observable<any> {
    return this.httpClient.delete(`${API_URL}/greetflow/${slno}`);
  }
  importVCCampaignMobileData(data: any): Observable<any> {
    return this.httpClient.post(environment.api_url + '/wa_campaign_data/', data);
  }
  readVCCampaign(customer_id: any): Observable<any> {
    //curl -X GET "https://localhost:8090/v1/campaign_details/?query=customer_id%3A22062201" -H  "accept: application/json" -H  "Authorization: Bearer 919502955786421"
    return  this.httpClient.get(environment.api_url + '/wa_campaign/');
  }
  getData(urlObj: UrlObj, reqDate: string): Observable<any | undefined> {
     console.log('urlObj:' + urlObj+ " : reqDate "+reqDate);
    switch (urlObj) {
      case UrlObj.MsgSumPivoteTableComponent:
        return this.getMessageSummaryReport(reqDate);
        break;
     /* case UrlObj.AgentStatusReport:
        return this.readAllAgentStatusR();
        break;*/
      
      default:
        break;
    }
    return this.readAll()
  }
  
}
