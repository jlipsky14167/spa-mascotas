export interface Evento {
    event_id?: number | string;
    pet_id: number | string;
    event_type_id: number | string;
    body: string;
    alarm_at?: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}