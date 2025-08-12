


export type MessageType = {
    side: "left" | "right",
    message: string,
    loading?: boolean;
}

export type User = {
    name: string;
    uuid: string;
    email: string;
    timesTaken?: number;
    highestScore?: number;
    testsAvailable?: number;
    imgUrl: string;
    password?: string;
    confirmPassword?: string;
    allTests: any[]
}


export type BrowserUser = {
    uuid: string;
    name: string;
    email: string;
    highestScore: number;
    timesTaken: number;
    testsAvailable: number;
    allTests: any[];
    imgUrl: string;

}

export type Test = {
    charmNum: number;
    executionNum: number;
    dateTaken: number;
}

export interface NotifType {
    type: string;
    message: string;
}

export type BlogProps = {
    title: string;
    paragraphs: string[];
    
}


export type Timeout = ReturnType<typeof setTimeout> | undefined;