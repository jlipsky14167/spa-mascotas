export interface Evento {
    event_type_name: string;
    pet_name: string;
    event_id?: number | string;
    pet_id: number | string;
    event_type_id: number | string;
    body: string;
    alarm_at?: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}