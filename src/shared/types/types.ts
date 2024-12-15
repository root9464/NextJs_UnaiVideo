export type SvgIcon = {
  width: string;
  height: string;
  fill?: string;
  stroke?: string;
  className?: string;
};

export type Tier = null | 'Pioneer' | 'Champion' | 'Hero' | 'Legend';

export type User = {
  id: number;
  tier?: Tier;
  limits: number;
  username: string;
  firstName: string;
  lastName: string;
  hash: string;
  balance: number;
};

export type PredictionResponse = {
  id: string;
  model: string;
  version: string;
  input: {
    prompt: string;
  };
  logs: string;
  output: string;
  data_removed: boolean;
  error: null | string;
  status: 'succeeded' | 'processing' | 'failed';
  created_at: string;
  started_at: string;
  completed_at: string;
  urls: {
    cancel: string;
    get: string;
    stream: string;
  };
  metrics: {
    predict_time: number;
  };
};
