
export class UsersModel {
  emailId: string;
  password: string;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}


export interface UploadModel {
  content: string;
  images: string;
  tags: string;
  
}

export interface NewEmployee {

  name: string;
  email: string;
  password?: string; 
  role: 'admin' | 'customer'; 
  avatar: string; 
}

export class EmpModel{
   name: string;
  email: string;
  password?: string; 
  avatar: string; 
  /**
   *
   */
  constructor() {
   this.name="";
   this.email="";
   this.password="";
   this.avatar=""

    
  }
}
