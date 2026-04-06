import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/api';

/**
 * Query: obtener lista de compañías
 */
export const LIST_COMPANIES = /* GraphQL */ `
  query ListCompanies {
    listCompanies {
      items {
        name
      }
    }
  }
`;

/**
 * Modelo de Company
 */
export interface Company {
  name: string;
}

/**
 * Respuesta tipada de GraphQL
 */
export interface ListCompaniesResponse {
  listCompanies: {
    items: Company[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly client = generateClient();

  /**
   * Obtiene todas las compañías
   */
  async getCompanies(): Promise<ListCompaniesResponse> {
    const response = (await this.client.graphql({
      query: LIST_COMPANIES,
      authMode: 'apiKey',
    })) as { data: ListCompaniesResponse };

    return response.data;
  }
}
