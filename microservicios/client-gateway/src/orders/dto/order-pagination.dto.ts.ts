import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "../enums/order-status.enum";
import { PaginationDto } from "src/common";

export class OrderPaginationDto extends PaginationDto{
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Valid status are ${Object.values(OrderStatus).join(', ')}`
    })
    status: OrderStatus
}