export interface Disk {
  author: {
    id: string,
    username: string
  };
  priority_data: any;
  _id: string;
  _ticket: string;
  type_stockage: string;
  isRaid: boolean;
  type_raid: string;
  cb_raid: string;
  disk_info: [{
    _id: string,
    marque: string,
    taille: string,
    serie: string
  }];
  manipulations: string;
  reason_panne: string;
  encrypt_pass: string;
  priority_info: string;
  system: string;
  export_method: string;
  expedition_method: string;
  track_id: string;
  artifact_url: string;
  date: string;
}
