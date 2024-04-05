export interface MessageSummary {
  count: number,
  direction: number,
  client_no: string,
  date: string,
  delivered_code: number,
  agent_id: number
}
export interface MessageSummaryResp {
  error_code: number
  error_message: string
  message_summary: MessageSummary[]
}
interface CommonError {
  error_code: number;
  error_message: string;
}

export interface ICommonData extends CommonError {
  DataArr: any;
}
export interface IMessageSummaryreportData extends CommonError {
  message_summary: MessageSummary[]
}
export interface wa_campaign_data_summ {
  wa_camp_data_summ_array: wa_campaign_data_summ[]
  "cnt": number,
  "imp": number,
  "delivered_code": number,
  "min_start_time": string,
  "max_end_time": string,
  "base_id": number,
  "min_instime": string

}
export interface wa_campaign_schedule_data_summ {
  campaign_schedule_data_array: wa_campaign_schedule_data_summ[]
  "cnt": number,
  "imp": number,
  "delivered_code": number,
  "insdate": string,
  "wa_campaign_id": number,
  "schedule_type": number
}
export interface out_message_summ {
  out_msg_summ: out_message_summ[]
  "Cnt": number,
  "Insdate": string,
  "Status": number
}

export interface in_message_summ {
  in_msg_summ: in_message_summ[]
  "cnt": number,
  "insdate": string,
  "download_media": number,
  "imp_auto": number
}
export interface out_status_summ {
  out_status_summ: out_status_summ[]
  "cnt": number,
  "insdate": string,
  "status_code": number,
  "status_error_code": number
}