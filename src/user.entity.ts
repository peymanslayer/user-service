
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('varchar')
  lastName: string;

  @Column({unique:true})
  email: string;

  @Column('int',{unique:true})
  mobile: number;

  @Column()
  password: string;

  @Column({unique:true,nullable:false})
  tokrn: string;
}
