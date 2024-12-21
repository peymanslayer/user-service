
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

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

  @Index()
  @Column('int',{unique:true})
  mobile: number;

  @Column()
  password: string;

  @Column({unique:true,nullable:true})
  tokrn: string;
}
