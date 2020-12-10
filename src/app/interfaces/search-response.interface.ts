export interface SearchResponse {
  players?: Player[];
  teams?: Team[];
  guild: Guild;
  tournaments?: Tournament[];
  matches?: Match[];
  proPlayers?: ProPlayer[];
}

export interface Player {
  account_id: number;
  personaname: string;
  avatarfull: string;
  last_match_time: string;
  similarity: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  bannerLogo?: string;
  dateCreated?: number;
  tag: string;
  winCount: number;
  lossCount: number;
  lastMatchDateTime: number;
}

export interface ProPlayer {
  id: number;
  lastActiveTime: string;
  name: string;
  avatar: string;
  soloRank: number;
  partyRank: number;
}

export interface Tournament {
  id: number;
  name: string;
  tier: number;
  private: boolean;
  freeToSpectate: boolean;
  startDateTime: number;
  endDateTime: number;
  tournamentUrl: string;
  lastMatchDateTime: number;
  prizePool: number;
  imageUri: string;
  displayName: string;
  isFollowed: boolean;
}

export interface Match {
  id: number;
  didRadiantWin: boolean;
  durationSeconds: number;
  startDateTime: number;
  numHumanPlayers: number;
  clusterId: number;
  firstBloodTime: number;
  lobbyType: number;
  gameMode: number;
  replaySalt: number;
  isStats: true;
  avgImp: number;
  parsedDateTime: number;
  statsDateTime: number;
  gameVersionId: number;
  regionId: number;
  sequenceNum: number;
  rank: number;
  bracket: number;
  endDateTime: number;
  players: any[];
  analysisOutcome: number;
  predictedOutcomeWeight: number;
}

export interface Guild {
  id: number;
  motd: string;
  name: string;
  tag: string;
  createdDateTime: string;
  language: number;
  flags: number;
  logo: string;
  region: number;
  description: string;
  requiredRank: number;
  primaryColor: number;
  secondaryColor: number;
  pattern: number;
  points: number;
  pastWeeklyRank: number;
  pastWeeklyPercentile: number;
  currentPercentile: number;
  memberCount: number;
  rank: number;
  totalBattlePassLevels: number;
  lastUpdateDateTime: string;
}
