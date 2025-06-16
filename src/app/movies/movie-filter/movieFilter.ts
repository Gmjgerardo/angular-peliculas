export interface MovieFilter {
  title: string;
  genreId: number;
  comingSoon: boolean;
  onCinemas: boolean;
  page: number;
  rowsPerPage: number;
}