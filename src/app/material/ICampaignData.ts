export interface CampaignDataReport{
  id: number,
  mobileno: number,
  instime: string,
  cli: number,
  to: number,
  start_time: string,
  end_time: string,
  retries: number,
  status: string,
  reasion: string,
  digits: string,
  duration: number,
  digits_details: string,
  pulse: number,  
}

export interface CampaignReportData {
  id: number;
  cname: string;
  circle_id: string;
  enable: number;
  day_start_time: string;
  day_end_time: string;
  is_unicode: number;
  sms_message: string;
}
export interface error_response {
  error_code: number,
  error_message: string
}
export interface UserDetails {
  error_response: error_response,
  userid: string,
  password: string,
  enable: number,
  mobileno: number,
  email: string,
  name: string
}
export interface CampaignSummaryMonthDay {
  call_count: number;
  campaign_id: number;
  customer_id: number;
  failed_count: string;
  pluse_count: number;
  success_count: string;
  date: string;
}

export interface UserDetailsUpdate {
  email: string,
  enable: number,
  mobileno: number,
  name: string,
  old_password: string,
  password: string,
  userid: string
}
export interface error_response {
  error_code: number,
  error_message: string
}
export interface WA_Campaign {
  id: number;
  cname: string;
  template_sname: string;
  campaign_type: number;
  agent_id: number;
  start_date: string;
  end_date: string;
  day_start: string;
  day_end: string;
  status: string;
  instime: number;
}
export interface WA_CampaignResp {
  error_code: number
  error_message: string
  wa_campaign: WA_Campaign[]
}
export interface WA_Campaign_Data {
  id: number
  wa_campaign_id: number
  mobileno: number
  baseid: number
  start_time: string
  end_time: string
  imp: number
  status: string
  reference: number
  delivered_code: number
  status_errordescription: string
  instime: number
}
export interface CampaignSummaryMonth {
  call_count: number;
  campaign_id: number;
  customer_id: number;
  failed_count: string;
  pluse_count: number;
  success_count: string;
  year_month: string;
}
export interface CampaignSummaryMonthDay {
  call_count: number;
  campaign_id: number;
  customer_id: number;
  failed_count: string;
  pluse_count: number;
  success_count: string;
  date: string;
}
export interface ICampaignParamCnt{
  campaignid:number;
  campaign_type:number;
  param_count:number;
}

export interface ICampaingImpMobileData{
  mobileno:number;
  params:string[];
}
export interface ICampaingImp{
  MobileData:ICampaingImpMobileData[];
  campaign_id: number,
  end_date: string,
  start_date: string
  
}
export interface WaCampaignReportData {
  id: number;
  agent_id: number;
  cname: string;
  campaign_type: number;
  day_end: string;
  day_start: string;
  end_date: string;
  instime: string;
  start_date: string;
  status: string;
  template_sname: string;
  param_count: string;
  
}

