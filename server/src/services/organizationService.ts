import { Organization } from "../models/organizations";
import { AppError } from "../utils/errorService";

export class OrganizationService {

    // Obtiene todas las organizaciones
    public async getAllOrganizations(): Promise<Organization[]> {
      try {
        const organizations = await Organization.findAll();
        return organizations;
      } catch (error: unknown) {
        throw new AppError('Error getting organizations', 500);
      };
    };

    // Obtiene una organización por ID
    public async getOrganizationById(id: number): Promise<Organization | null> {
      try {
        const organization = await Organization.findByPk(id);
        return organization;
      } catch (error: unknown) {
        throw new AppError('Error getting organization', 500);
      };
    };

    // Crea una organización
    public async createOrganization(data: Partial<Organization>): Promise<Organization> {
      try {
        const { name, address } = data;
        const organization = await Organization.create({ name, address });
        return organization;
      } catch (error: unknown) {
        throw new AppError('Error creating organization', 500);
      };
    };

    // Actualiza una organización
    public async updateOrganization(id: number, data: Partial<Organization>): Promise<Organization | null> {
        try {
            const organization = await Organization.findByPk(id);
            if (!organization) throw new AppError('Organization not found', 404);
            await organization.update(data);
            return organization;
        } catch (error: unknown) {
            throw new AppError('Error updating organization', 500);
        };
    };

    // Elimina una organización
    public async deleteOrganization(id: number): Promise<void> {
        try {
            const organization = await Organization.findByPk(id);
            if (!organization) throw new AppError('Organization not found', 404);
            await organization.destroy();
        } catch (error: unknown) {
            throw new AppError('Error deleting organization', 500);
        };
    };

};