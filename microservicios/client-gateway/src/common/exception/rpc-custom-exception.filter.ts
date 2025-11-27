import { ArgumentsHost, Catch, ExceptionFilter, RpcExceptionFilter, UnauthorizedException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";
import { json } from "stream/consumers";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if (typeof rpcError === 'object' && rpcError !== null) {
            const status =
                Number(
                    rpcError['statusCode'] ??
                    rpcError['status'] ??
                    rpcError['code']
                ) || 500;

            return response.status(status).json({
                statusCode: status,
                message: rpcError['message'] ?? 'Unexpected RPC error',
                error: rpcError['error'] ?? undefined,
            });
        }
        
        return response.status(500).json({
            statusCode: 500,
            message: rpcError,
            error: 'Internal RPC error',
        });
    }
}