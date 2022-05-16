export declare type ProjectNameType = {
  projectName: string;
  description: string;
};

export declare type SprintType = {
  id: string;
  name: string;
};

export declare type ProjectField = {
  name: string;
  description: string;
};

export declare type ProjectType = ProjectField & {
  id: string;
  sprints: SprintType[];
};
