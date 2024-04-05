export interface Cms_template{
    id:number 
    client_number:string
    sname : string 
    template_wa_Namespace:string
    template_wa_elementname:string 
    language_policy :string
    language_code :string
    template_wa_components:number
    msg_text :string 
    contacts:number
    location_latitude:string
    location_longitude :string 
    lable:string
    search_query :string
    media_name :string
    media_uri :string
    mime_type:string
    enable:number
  }
  export interface create_cms_components{
    client_number:string
    sname : string 
    template_wa_components :number
    
  }
  export interface Cms_temp_wa_comp_params {
    id: number,
    client_number: string,
    sname: string,
    components_id: number,
    type: string,
    param_name: string,
    media_name: string,
    media_uri: string,
    mime_type: string,
    msg_text: string,
    currency_fallback_value: string,
    currency_code: string,
    date_time: string,
    enable: number,
    is_edit: number
}