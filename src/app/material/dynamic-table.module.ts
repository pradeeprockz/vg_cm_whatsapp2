import { ICircleData } from "./circleData";
import { CampaignReportData} from "./ICampaignData";
import {User_Campaign_Data} from "./user_campaign_data";
import { WaCampaignReportData,CampaignSummaryMonth,CampaignSummaryMonthDay,CampaignDataReport } from "./ICampaignData";



export interface ICampaignData {
  error_code: number;
  error_message: string;
  campaign_smsibm: CampaignReportData[];
  smsi_data_circle: ICircleData[];
  camp_sms_ibm_user: User_Campaign_Data[];
  wa_campaign:WaCampaignReportData[];
  campaignSummaryMonth:CampaignSummaryMonth[];
  campaignSummaryMonthDay:CampaignSummaryMonthDay[];
  campaignDataReport: CampaignDataReport[];
  searchText: string;
  term: string;
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
export interface ICampaingImpMobileDataSchedule{
  mobileno:number;
  param1:string;
  param2:string;
  param3:string;
  param4:string;
  start_date:string;
}
export interface ICampaingImp{
  MobileData:ICampaingImpMobileData[];
  campaign_id: number,
  end_date: string,
  start_date: string,
  start_time:number,
  end_time:number
}
export interface ICampaingImpSchedule{
  MobileData:ICampaingImpMobileDataSchedule[];
  campaign_id: number,
  schedule_type: number,
}
