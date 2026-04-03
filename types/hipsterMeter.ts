export interface hipsterMeterResponse {
    status: string;
    source: string;
    data: {
        hipsterScore: number;
        badge: string;
        badgeDescription: string;
        proof: {
            name: string;
            image: string;
            roastMessage: string;
        };
        generatedAt: string;
    };
}