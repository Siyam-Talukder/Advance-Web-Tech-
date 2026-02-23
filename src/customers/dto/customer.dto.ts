
export class CreateCustomerDto {
  name: string;
  email: string;
}

export class UpdateCustomerDto {
  address?: string;
  phone?: string;
}