export interface Technology {
  id: string;
  name: string;
  category: string;
  ring?: string;
  technologyDescription: string;
  classificationDescription?: string;
  isPublished?: boolean;
  publishDate?: Date;
}
