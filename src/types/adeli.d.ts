export interface AdeliRawResponse {
  rows: string[][];
  columns: [keyof AdeliData];
  filtered_table_rows_count: number;
}

export interface AdeliData {
  rowid: string;
  "Type d'identifiant PP": string;
  "Identifiant PP": string;
  "Identification nationale PP": string;
  "Code civilité d'exercice": string;
  "Libellé civilité d'exercice": string;
  "Code civilité": string;
  "Libellé civilité": string;
  "Nom d'exercice": string;
  "Prénom d'exercice": string;
  "Code profession": string;
  "Libellé profession": string;
  "Code catégorie professionnelle": string;
  "Libellé catégorie professionnelle": string;
  "Code type savoir-faire": string;
  "Libellé type savoir-faire": string;
  "Code savoir-faire": string;
  "Libellé savoir-faire": string;
  "Code mode exercice": string;
  "Libellé mode exercice": string;
  "Numéro SIRET site": string;
  "Numéro SIREN site": string;
  "Numéro FINESS site": string;
  "Numéro FINESS établissement juridique": string;
  "Identifiant technique de la structure": string;
  "Raison sociale site": string;
  "Enseigne commerciale site": string;
  "Complément destinataire (coord. structure)": string;
  "Complément point géographique (coord. structure)": string;
  "Numéro Voie (coord. structure)": string;
  "Indice répétition voie (coord. structure)": string;
  "Code type de voie (coord. structure)": string;
  "Libellé type de voie (coord. structure)": string;
  "Libellé Voie (coord. structure)": string;
  "Mention distribution (coord. structure)": string;
  "Bureau cedex (coord. structure)": string;
  "Code postal (coord. structure)": string;
  "Code commune (coord. structure)": string;
  "Libellé commune (coord. structure)": string;
  "Code pays (coord. structure)": string;
  "Libellé pays (coord. structure)": string;
  "Téléphone (coord. structure)": string;
  "Téléphone 2 (coord. structure)": string;
  "Télécopie (coord. structure)": string;
  "Adresse e-mail (coord. structure)": string;
  "Code Département (structure)": string;
  "Libellé Département (structure)": string;
  "Ancien identifiant de la structure": string;
  "Autorité d'enregistrement": string;
  "Code secteur d'activité": string;
  "Libellé secteur d'activité": string;
  "Code section tableau pharmaciens": string;
  "Libellé section tableau pharmaciens": string;
}
