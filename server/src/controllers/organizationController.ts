import { Request, Response } from 'express';
import { OrganizationService } from '../services/organizationService';
import { AppError } from '../utils/errorService';

const organizationService = new OrganizationService();

export class OrganizationController {

    public async getOrganizations(req: Request, res: Response): Promise<void> {
        try {
        const organizations = await organizationService.getAllOrganizations();
        res.json(organizations);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };
    
    public async getOrganizationById(req: Request, res: Response): Promise<void> {
        try {
        const organizationId = Number(req.params.id);
        const organization = await organizationService.getOrganizationById(organizationId);
        res.json(organization);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };
    
    public async createOrganization(req: Request, res: Response): Promise<void> {
        try {
        const { name, address } = req.body;
        const organization = await organizationService.createOrganization({ name, address });
        res.status(201).json(organization);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };
    
    public async updateOrganization(req: Request, res: Response): Promise<void> {
        try {
        const organizationId = Number(req.params.id);
        const { name, address } = req.body;
        const organization = await organizationService.updateOrganization(organizationId, { name, address });
        res.json(organization);
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };
    
    public async deleteOrganization(req: Request, res: Response): Promise<void> {
        try {
        const organizationId = Number(req.params.id);
        await organizationService.deleteOrganization(organizationId);
        res.status(204).end();
        } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        };
        };
    };
    
};