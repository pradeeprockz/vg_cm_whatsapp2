export interface wa_block{
    id: number,
    customer_number: number,
    in_out: number,
    client_id: number,
    enable: number,
    instime: string
}

export interface wa_blockArr{
    wa_block:wa_block[]
    error_code: 0,
    error_message:''
}

export interface greetflow{
    slno: number,
    subapp_name: string,             
    level_name: string,
    old_level: string,
    next_level: string,
    input: string,
    appand_text: string,
    type_content: number,
    text_content: string,
    content_path:string,
    enable: number,
    remarks: string
}
export interface greetflowArr{
    greet_flow:greetflow[]
    error_code: 0,
    error_message:''
}