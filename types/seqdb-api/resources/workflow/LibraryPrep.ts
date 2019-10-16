import { KitsuResource } from "kitsu";
import { IndexPrimer } from "../IndexPrimer";
import { Sample } from "../Sample";
import { LibraryPrepBatch } from "./LibraryPrepBatch";

interface LibraryPrepAttributes {
  inputNg?: number;
  quality?: string;
  size?: string;
  wellColumn?: number;
  wellRow?: string;
}

interface LibraryPrepRelationships {
  libraryPrepBatch: LibraryPrepBatch;
  sample?: Sample;
  indexI5?: IndexPrimer;
  indexI7?: IndexPrimer;
}

export type LibraryPrep = KitsuResource &
  LibraryPrepAttributes &
  LibraryPrepRelationships;
