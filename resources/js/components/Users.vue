<template>
    <div class="container">

        <div class="row mt-5">
          <div class="col-md-12" v-if="$gate.isAdmin()">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Managements</h3>

                <div class="card-tools">
                 <button class="btn btn-primary" @click="newModal()">Add New <i class="fas fa-user-plus"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type </th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                  <tr v-for="user in users" :key= "user.id" >
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.type | upText }}</td>
                    <td>{{ user.created_at | myDate }}</td>
                    <td>
                        <a href="#" @click="editModal(user)">
                            <i class="fas fa-user-edit blue"></i>
                        </a>
                            
                         <a href="#" @click="deleteUser(user.id)">
                            <i class="fas fa-trash-alt red"></i>
                        </a>
                    </td>
                  </tr>
                  
                </tbody></table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>    
        
        <form @submit.prevent="editMode ? updateUser() : createUser() ">
        <!-- Modal -->
        <div class="modal fade" id="addnew" tabindex="-1" role="dialog" aria-labelledby="addnewLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 v-show="editMode" class="modal-title" id="addnewLabel">Update User Information</h5>
                <h5 v-show="!editMode" class="modal-title" id="addnewLabel">Add New User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <div class="form-group">
                  <input v-model="form.name" type="text" name="name" placeholder="Name" id="name" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                  <has-error :form="form" field="name"></has-error>
                </div>

                <div class="form-group">
                  <input v-model="form.email" type="email" name="email" placeholder="Email" id="email" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                  <has-error :form="form" field="email"></has-error>
                </div>

                

                <div class="form-group">
                  <textarea v-model="form.bio" type="bio" name="bio" placeholder="write your bio here" id="bio" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"> </textarea>
                  <has-error :form="form" field="bio"></has-error>
                </div>

                <div class="form-group">
                  <select v-model="form.type" type="type" name="type" placeholder="write your bio here" id="type" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                    <option value="">Select User Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">Standard User</option>
                    <option value="author">Author</option>
                  </select>
                  <has-error :form="form" field="type"></has-error>
                </div>
                
                <div class="form-group">
                  <input v-model="form.password" type="password" name="password" placeholder="Password"  id="password" 
                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                  <has-error :form="form" field="password"></has-error>
                </div>



              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
              </div>
            </div>
          </div>
        </div>
        </form>


    </div>

</template>

<script>
    export default {


        data(){
            return {
                editMode: false,
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },

        methods: {

          updateUser(){
            this.$Progress.start();
            //console.log('Edit page here');
            this.form.put('api/user/'+this.form.id)
            .then(function() {
              $('#addnew').modal('hide');
              Fire.$emit('AfterCreate');
              //successs
              swal(
                'Updated!',
                'Information has been updated.',
                'success'
                )
              this.$Progress.finish();

            })
            .catch( function(){
              this.$Progress.fail();
            });
          },

          editModal(user){
            this.editMode = true;
            this.form.reset();
            $('#addnew').modal('show');
            this.form.fill(user);
          },

          newModal(){
            this.editMode = false;
            this.form.reset();
            $('#addnew').modal('show');
          },

          deleteUser(id) {

              swal({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                  if (result.value) {
                    //Send request to the server
                    this.form.delete('api/user/'+id).then(function(){
                          swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                          Fire.$emit('AfterCreate');
                    }).catch(function(){
                      swal(
                            'Failed!',
                            'There was something wrong',
                            'warning'
                          )
                    }); 
                   
                  }
                })

          },

            loadUsers(){
              if(this.$gate.isAdmin){
                axios.get('api/user').then(({data}) =>(this.users = data.data));
              }
            
        },
            createUser() {
                this.$Progress.start();
                this.form.post('api/user')
                .then(function(){
                  Fire.$emit('AfterCreate');


                $('#addnew').modal('hide');
                toast({
                  type: 'success',
                  title: 'User Created successfully'
                });
                this.$Progress.finish();
                })
                .catch(function(){
                  this.$Progress.fail();
                });
                
            }
        },

        created() {
            this.loadUsers();
            Fire.$on('AfterCreate',
              this.loadUsers);
            //setInterval(this.loadUsers, 3000);
        }
    }
</script>
