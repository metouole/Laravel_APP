<style>
    .widget-user-header{
        background-position: center center;
        -webkit-background-size: cover;
        background-size: cover;
        height: 250px !important;
    }

</style>

<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                
                <div class="card card-widget widget-user">
                  <!-- Add the bg color to the header using any of the bg-* classes -->
                  <div class="widget-user-header text-white" style="background: url('./img/proc.png');">
                    <h3 class="widget-user-username">SOMDA Symphonie</h3>
                    <h5 class="widget-user-desc">Iverson Daughter</h5>
                  </div>
                  <div class="widget-user-image">
                    <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                  </div>
                  <div class="card-footer">
                    <div class="row">
                      <div class="col-sm-4 border-right">
                        <div class="description-block">
                          <h5 class="description-header">3,200</h5>
                          <span class="description-text">Ventes</span>
                        </div>
                        <!-- /.description-block -->
                      </div>
                      <!-- /.col -->
                      <div class="col-sm-4 border-right">
                        <div class="description-block">
                          <h5 class="description-header">13,000</h5>
                          <span class="description-text">FOLLOWERS</span>
                        </div>
                        <!-- /.description-block -->
                      </div>
                      <!-- /.col -->
                      <div class="col-sm-4">
                        <div class="description-block">
                          <h5 class="description-header">35</h5>
                          <span class="description-text">PRODUCTS</span>
                        </div>
                        <!-- /.description-block -->
                      </div>
                      <!-- /.col -->
                    </div>
                    <!-- /.row -->
                  </div>
                </div>

            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane" id="activity">
                    <!-- Post -->
                    <div class="post">
                     
                    </div>
                    <!-- /.post -->

                    

                  </div>
            

                  <div class="tab-pane active show" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="name"  class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                          <input type="email" v-model="form.name" class="form-control" id="name" placeholder="Name" :class="{ 'is-invalid': form.errors.has('name') }">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="email" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                          <input type="email" v-model="form.email" class="form-control" id="email" placeholder="Email" :class="{ 'is-invalid': form.errors.has('email') }">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="password"  class="col-sm-2 control-label">password</label>

                        <div class="col-sm-10">
                          <input type="text" v-model="form.password" class="form-control" id="password" placeholder="password">
                        </div>
                      </div>
                      <div class="form-group">
                          <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                          <div class="col-sm-12">
                              <input type="file" @change="updateProfile" name="photo" class="form-input">
                          </div>

                      </div>

                      <div class="form-group">
                        <label for="bio" class="col-sm-2 control-label">biographie</label>

                        <div class="col-sm-10">
                          <textarea class="form-control" v-model="form.bio" id="bio" placeholder="Biography" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="type" class="col-sm-2 control-label">Types</label>

                        <div class="col-sm-10">
                          <input type="text" v-model="form.type" class="form-control" id="type" placeholder="Types" :class="{ 'is-invalid': form.errors.has('type') }">
                        </div>
                      </div>
                      
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button @click.prevent="updateInfo" type="submit" class="btn btn-primary">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>



            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
          return {
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

        mounted() {
            console.log('Component mounted.')
        },

        methods: {

          getProfilePhoto(){
            let photo = (this.form.photo.length > 100) ? this.form.photo : "img/profile/"+ this.form.photo;
            return photo;
          },

          updateInfo(){
            this.$Progress.start();
            this.form.put('api/profile')
            .then(()=>{
              this.$Progress.finish();

            })
            .catch(()=>{
              this.$Progress.fail();
            });
          },

          updateProfile(e) {
            //console.log('uploading');
            let file = e.target.files[0];
            //console.log(file);
            let reader = new FileReader();

            if(file['size'] < 2111775) {
                reader.onloadend = (file) => {
                //console.log('RESULT', reader.result)
                this.form.photo = reader.result;
              }
              reader.readAsDataURL(file);
            } else {
              swal({
                type: 'error',
                title: 'Oops...',
                text: 'You are uploading a large file',
              })
            }
            
          }

        },

        created() {
           axios.get('api/profile').then(({data}) =>(this.form.fill(data)));
        }
    }
</script>
