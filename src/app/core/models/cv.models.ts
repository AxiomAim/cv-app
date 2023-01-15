import { UUID } from 'angular2-uuid';
export class CVModel {

    constructor(
        id: string, 
        name: string, 
        email: string, 
        phone: string, 
        website: string, 
        dob: string,
        imageUrl: string,
        linkedIn: string,
        github: string,
        twitter: string,
        skype: string,
        address: string,
        skills: SkillsDto[],
        portfolio: PortfolioDto[],
        experience: ExperienceDto[],
        education: EducationDto[],
        testimonials: TestimonialDto[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string
            ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.dob = dob;
        this.imageUrl = imageUrl;
        this.linkedIn = linkedIn;
        this.github = github;
        this.twitter = twitter;
        this.skype = skype;
        this.address = address;
        this.skills = skills;
        this.portfolio = portfolio;
        this.experience = experience;
        this.education = education;
        this.testimonials = testimonials;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
    public id:string;
    public name:string;
    public email: string;
    public phone: string;
    public website: string;
    public dob: string;
    public imageUrl: string;
    public linkedIn: string;
    public github: string;
    public twitter: string;
    public skype: string;
    public address: string;
    public skills: SkillsDto[];
    public portfolio: PortfolioDto[];
    public experience: ExperienceDto[];
    public education: EducationDto[];
    public testimonials: TestimonialDto[];
    public created_at: string;
    public updated_at: string;
    public deleted_at: string;

    public static emptyDto(): CVDto {
        let date: any = new Date().toISOString(); 
        return {
            id: UUID.UUID(),
            name: null,
            email: null,
            phone: null,
            website: null,
            dob: null,
            imageUrl: null,
            linkedIn: null,
            github: null,
            twitter: null,
            skype: null,
            address: null,
            skills: [],
            portfolio: [],
            experience: [],
            education: [],
            testimonials: [],
            created_at: date,
            updated_at: date,
            deleted_at: ''
        }
    }

    public toDto(): CVDto {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            website: this.website,
            dob: this.dob,
            imageUrl: this.imageUrl,
            linkedIn: this.linkedIn,
            github: this.github,
            twitter: this.twitter,
            skype: this.skype,
            address: this.address,
            skills: this.skills,
            portfolio: this.portfolio,
            experience: this.experience,
            education: this.education,
            testimonials: this.testimonials,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export interface CVDto {
    id: string, 
    name: string, 
    email: string, 
    phone: string, 
    website: string, 
    dob: string,
    imageUrl: string,
    linkedIn: string,
    github: string,
    twitter: string,
    skype: string,
    address: string,
    skills: SkillsDto[],
    portfolio: PortfolioDto[],
    experience: ExperienceDto[],
    education: EducationDto[],
    testimonials: TestimonialDto[],
    created_at?: string,
    updated_at?: string,
    deleted_at?: string
}

export interface SkillsDto {
    skill: string, 
    type: string, 
    level: number, 
}

export interface PortfolioDto {
    title: string, 
    description: string, 
    url: number, 
    images: ImagesDto[]
}

export interface ImagesDto {
    title: string, 
    description: string, 
    imageUrl: number, 
}

export interface ExperienceDto {
    role: string, 
    summary: string,
    start_at: string, 
    end_at: string, 
    company: string,    
}

export interface EducationDto {
    credential: string, 
    summary: string,
    start_at: string, 
    end_at: string, 
    school: string,    
}

export interface TestimonialDto {
    quote: string,
    person: string, 
    title: string
}

