/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MOVIE_APP_API_KEY: string;
  readonly VITE_MOVIE_APP_MOVIES_RATING: string;
  readonly VITE_MOVIE_APP_IMAGES_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
