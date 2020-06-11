import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  public email!: string;

  @Column({ type: 'varchar' })
  public password!: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @Column('timestamp')
  @CreateDateColumn()
  public createdAt!: Date;

  @Column('timestamp')
  @UpdateDateColumn()
  public updatedAt!: Date;
}