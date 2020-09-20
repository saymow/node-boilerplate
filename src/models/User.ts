import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('time with time zone')
  date: Date;
}

export default Users;
