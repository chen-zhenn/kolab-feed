import { HttpStatusCode } from '@/infra'

export interface IHttpPostQueryParams {
    user_id?: string;
    id?: number;
    title?: string;
    body?: string;
    q?: string;
}

export interface ISupaBaseUser {
    id?: string;
    email?: string;
    role?: string;
}

export interface ISupaBaseSession {
    token_type: string;
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    expires_at: number;
}

export interface ISupaBaseLogin {
    session: {
        user: ISupaBaseUser;
        session: ISupaBaseSession;
        weakPassword?: any | undefined;
    } 
}

export enum HttpStatusMessages {
    servererror = 'Erro interno: Problema ao processar sua solicitação. Tente novamente mais tarde',
    badrequest = 'Dados inválidos: Os parâmetros fornecidos na sua solicitação são inválidos.',
    unauthorized = 'Acesso negado: Você não tem permissão para acessar esse recurso',
    notfound = 'Recurso não encontrado: O recurso solicitado não existe.',
}

export const SupabaseStatusCode = {
    'invalid_credentials': HttpStatusCode.badrequest,
    '22P02': HttpStatusCode.badrequest,
    '23505': HttpStatusCode.badrequest,
    'PGRST116': HttpStatusCode.badrequest,
    '42703': HttpStatusCode.notfound,
    '42501': HttpStatusCode.unauthorized,
    '42P01': HttpStatusCode.servererror,
    '58030': HttpStatusCode.servererror,
    'UnknownError': HttpStatusCode.servererror,
} as const

export const SupabaseStatusMessage = {
    'invalid_credentials': HttpStatusMessages.badrequest,
    '22P02': HttpStatusMessages.badrequest,
    '23505': HttpStatusMessages.badrequest,
    'PGRST116': HttpStatusMessages.badrequest,
    '42703': HttpStatusMessages.notfound,
    '42501': HttpStatusMessages.unauthorized,
    '42P01': HttpStatusMessages.servererror,
    '58030': HttpStatusMessages.servererror,
    'UnknownError': HttpStatusMessages.servererror,
} as const

export type SupabaseErrorCodes = keyof typeof SupabaseStatusMessage
