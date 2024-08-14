export interface Driver {
    driverId: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  }
  
  export interface Race {
    raceName: string;
    Circuit: {
      circuitName: string;
    };
    round: number;
  }
  