export class GlobalConstants {
  public static ApiBaseUrl: string = "http://localhost:4566/api/v1";

  public static technologyCategories: { text: string, value: string }[] = [
    { text: 'Techniques', value: 'techniques' }, 
    { text: 'Platforms', value: 'platforms' }, 
    { text: 'Tools', value: 'tools' }, 
    { text: 'Languages & Frameworks', value: 'languages' }
  ];
  public static technologyRingTypes: { text: string, value: string }[] = [
    { text: 'Assess', value: 'assess' },
    { text: 'Trial', value: 'trial' },
    { text: 'Adopt', value: 'adopt' },
    { text: 'Hold', value: 'hold' }
  ];
}
