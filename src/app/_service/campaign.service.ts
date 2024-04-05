import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.api_url + '/campaign_smsibm';
const API_URL1: string = environment.api_url + '/smsi_data/';
const camapign_smsibm_data: string =
  environment.api_url + '/campaign_smsibm_data/';
 const smsi_data_circle:string=environment.api_url+ '/smsi_data_circle/';
 const campaign_sms_ibm_user: string = environment.api_url + "/camp_sms_ibm_user/";



@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private httpClient: HttpClient) {}

  importVCCampaignMobileData(data: any): Observable<any> {
    return this.httpClient.post(environment.api_url + '/wa_campaign_data/', data);
  }
  importVCCampaignMobileDataSchedule(data: any): Observable<any> {
    return this.httpClient.post(environment.api_url + '/wa_campaign_schedule_data/', data);
  }
  
  readVCCampaignDataReport(campaign_id:string,year_month:string): Observable<any> {    
    //"https://localhost:8090/v1/campaign_report/?campaign_id=195164614713&month_date=2022-06
    return  this.httpClient.get(environment.api_url + '/campaign_report/?campaign_id='+campaign_id+'&month_date='+year_month);
  }

  readVCCampaignSummaryMonthDay(campaign_id:string,year_month:string): Observable<any> {    
    return  this.httpClient.get(environment.api_url + '/campaign_summary_month_day/?year_month='+year_month+'&campaign_id='+campaign_id);
  }
  readVCCampaignSummaryMonth(): Observable<any> {    
    return  this.httpClient.get(environment.api_url + '/campaign_summary_month/');
  }
  readVCCampaign(customer_id: any): Observable<any> {
    //curl -X GET "https://localhost:8090/v1/campaign_details/?query=customer_id%3A22062201" -H  "accept: application/json" -H  "Authorization: Bearer 919502955786421"
    return  this.httpClient.get(environment.api_url + '/wa_campaign/');
  }
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
  searchByProduct(cname: string): Observable<any> {
    return this.httpClient.get(`${API_URL}?name=${cname}`);
  }
  readUserAll(): Observable<any> {
    return this.httpClient.get(campaign_sms_ibm_user + '?limit=1000');
  }
  readUser(id: number): Observable<any> {
    return this.httpClient.get(`${API_URL}/${id}`);
  }
  createUser(data: any): Observable<any> {
    return this.httpClient.post(campaign_sms_ibm_user, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${campaign_sms_ibm_user}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${campaign_sms_ibm_user}/${id}`);
  }
  //////////////smsData
  createSMSData(data: any): Observable<any> {
    return this.httpClient.post(API_URL1, data);
  }
  creatMobileData(data: any): Observable<any> {
    return this.httpClient.post(camapign_smsibm_data, data);
  }
  createUserData(data: any): Observable<any> {
    return this.httpClient.post(campaign_sms_ibm_user, data);
  }
  dataCircle(data: any): Observable<any> {
    return this.httpClient.post(smsi_data_circle, data);
  }
  //-------------------ctcb_agent_offer
  createCtcbOffer(data: any): Observable<any> {
    return this.httpClient.post( environment.api_url+"/ctcb_offer", data);
  }
  
  getUserDetails(name: string): Observable<any> {
    return this.httpClient.get(`${API_URL}/user_web_manage/${name}`);
  }
  updateUserDetails(data: any): Observable<any> {
    return this.httpClient.put(`${API_URL}/user_web_manage/`, data);
  }
  getMessageSummaryReport(date: any): Observable<any> {
    return this.httpClient.get(`${API_URL}/message_summary/${date}`);
  }
  getCmsTemplateReport(date: any): Observable<any> {
    return this.httpClient.get(`${API_URL}/cms_template/${date}`);
  }
}
