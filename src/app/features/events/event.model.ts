export interface Team {
  name: string;
  logo: string;
}

export interface Score {
  home: number;
  away: number;
}

export interface SportsEvent {
  id: number;
  matchday: number;
  date: string;
  time: string;
  stadium: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  status: 'completed' | 'upcoming';
}

export interface EventResponse {
  laliga: SportsEvent[];
  total?: number;
  current_page?: number;
  total_pages?: number;
}
