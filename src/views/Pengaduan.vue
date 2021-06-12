<template>
 <div class="container-scroller">
     <div>
        <div class="content-wrapper-warna  "  >
          <div class="col-lg-12 grid-margin stretch-card">
               <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Pengaduan Masyarakat</b></p>

               <div >
                <vue-html2pdf
                  :show-layout="false"
                  :float-layout="true"
                  :enable-download="false"
                  :preview-modal="true"
                  :paginate-elements-by-height="1400"
                    filename="Invoice"
                  :pdf-quality="2"
                  :manual-pagination="true"
                    pdf-format="a4"
                    pdf-orientation="portrait"
                    pdf-content-width="800px"
 
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf" >
        <section slot="pdf-content">
            <div class="invoice-box">
			  <table>
				  <tr class="top">
					  <td colspan="2">
					  	<table>
						  	<tr>

                <td>
                  Dengan: {{reports.nama}} <br>
                  <!-- Tanggal: {{reportt.tgl_tanggapan}} <br> -->
                  Kategori: {{reportk.nama_kategori}} <br>
                  Status: {{reportp.status}}
                </td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									<!-- Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, TX 12345 -->
								</td>

								<!-- <td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td> -->
							</tr>
						</table>
					</td>
				</tr>

				<tr class="heading">
					<td>Data User</td>

					<td>#</td>
				</tr>

				<tr class="details">
					<td>NIK</td>
					<td>{{reports.nik}}</td>
				</tr>

        <tr class="details">
					<td>Nama Lengkap</td>
					<td>{{reports.nama}}</td>
				</tr>

        <tr class="details">
					<td>Username</td>
					<td>{{reports.username}}</td>
				</tr>

        <tr class="details">
					<td>Nomor Telepon</td>
					<td>{{reports.telp}}</td>
				</tr>


				<tr class="heading">
					<td>Data Pengaduan</td>

					<td>#</td>
				</tr>

				<tr class="item">
					<td>Tanggal Pengaduan</td>
					<td>{{reportp.tgl_pengaduan}}</td>
				</tr>

				<tr class="item">
					<td>Laporan</td>
					<td>{{reportp.isi_laporan}}</td>
				</tr>

        <tr class="item">
					<td>Status</td>
					<td> <span v-if="reportp.status">{{reportp.status}} </span> <span v-else>-</span></td>
				</tr>

         <tr class="item">
					<td>Foto</td>
					<td> <img v-if="reportp.foto"
          style="width: 150px;
          height: 120px;
          border-radius:5%;"
           :src="'http://localhost:8000/uploads/' + reportp.foto" ></td>
				</tr>

        <tr class="item">
					<td>Tanggapan</td>
					<td>{{reportt.tanggapan}}</td>
				</tr>

			</table>
		</div>
        </section>
    </vue-html2pdf>
   </div>



              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <template v-slot:cell(tanggapan)="data">
                    {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null}}
                  </template>
                   <!-- <template v-slot:cell(telp)="data">
                    {{ data.item.user.telp}}
                  </template> -->
                    <template v-slot:cell(status)="data">
                    <b-badge variant="info" v-if="data.item.status === 'terkirim'">{{ data.item.status }}</b-badge>
                    <b-badge variant="warning" v-if="data.item.status === 'proses'">{{ data.item.status }}</b-badge>
                    <b-badge variant="success" v-if="data.item.status === 'selesai'">{{ data.item.status }}</b-badge>
                    <b-badge variant="danger" v-if="data.item.status === 'tolak'">{{ data.item.status }}</b-badge>
                  </template>
                  <template v-slot:cell(foto)="data">
                    <img
                      style="width: 150px; height: 120px; border-radius: 5%"
                      :src="'http://localhost:8000/uploads/' + data.item.foto"
                    />
                  </template>

                  <template v-slot:cell(Aksi)="data">
                    <b-button size="sm" variant="info" v-on:click="Edit(data.item)" v-b-modal.modalUser><i class="mdi mdi-pencil btn-icon-prepend"></i>Status</b-button>&nbsp;
                    <b-button size="sm" variant="danger" v-on:click="Add(data.item)" v-b-modal.modalTanggapan><i class="mdi mdi-pencil btn-icon-prepend"></i>Tanggapan</b-button>&nbsp;
                    <b-button size="sm" variant="dark" v-on:click="generateReport(data.item.id_pengaduan)"><i class="mdi mdi-note btn-icon-prepend"></i>Laporan</b-button>
                  </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="primary"></b-spinner>
                  <strong class="text-primary">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-primary">{{ message }}</strong>
                </b-toast>

              </div>
            </div>
          </div>

          </div>
        </div>
     </div>    

   <b-modal 
      id="modalUser"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Form 
      </template>
        <form ref="form">
          <div class="form-group">
            <div class="form-group">
              <label for="status" class="col-form-label">Status</label>
              <select class="form-control" name="status" id="status" v-model="status">
                <option value="terkirim" checked>Terkirim</option>
                <option value="tolak">Tolak</option>
                <option value="proses">Proses</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
          </div>
        </form>
    </b-modal>

    <b-modal 
      id="modalTanggapan"
      @ok="Save1"
    >
      <template v-slot:modal-title>
        Tanggapan 
      </template>
        <form ref="form">
          <div class="form-group">
             <div class="form-group">
              <label for="tanggapan" class="col-form-label">Tanggapan</label>
              <input type="text" class="form-control" placeholder="Tanggapan" v-model="tanggapan">
            </div>
          </div>
        </form>
    </b-modal>

 </div>
</template>


<script>
import VueHtml2pdf from 'vue-html2pdf'
export default {
  data : function(){
    return {
      search: "",
      reportp:"",
      reportk:"",
      reportt:"",
      reports:"",
      nik:"",
      nama:"",
      telp:"",
      username:"",
      id_pengaduan:"",
      nama_kategori:"",
      id: "",
      tgl_pengaduan: "",
      isi_laporan: "",
      id_user:"",
      foto: "",
      status: "",
      id_kategori:"",
      tanggapan:"",
      id_petugas:"",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      user: [],
      pengaduan:[],
      tanggapan:[],
      kategori:[],
      fields: ["id_pengaduan","id_user", "tgl_pengaduan", "isi_laporan", "foto","status", "tanggapan","Aksi"],
    }
  },
  
  components:{
    VueHtml2pdf
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.pengaduan.tanggapan;
          this.user = response.data.data.user;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(item){
      this.action = "insert";
      this.id_pengaduan = item.id_pengaduan;
      this.tanggapan = "";
    },

    Edit : function(item){
      this.action = "update";
      this.id_pengaduan = item.id_pengaduan;
      this.status = item.status;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      this.action === "update"
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        form.append("status", this.status);

        this.axios.post("/pengaduan/status", form, conf)
        .then((response) => {
          if (response.data.success){
             this.$bvToast.hide("loadingToast");
             this.message = response.data.message;
             this.$bvToast.show("message");
             this.pengaduan = response.data.data.pengaduan;
             this.rows = response.data.data.count;
             this.getData();
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal mengubah status";
            this.$bvToast.show("message");
          }}
          )
          },

      Save1 : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      this.action === "insert"
        let form = new FormData();
        form.append("id_pengaduan", this.id_pengaduan);
        // form.append("tgl_tanggapan", this.tgl_tanggapan);
        form.append("tanggapan", this.tanggapan);

        this.axios.post("/pengaduan/tanggapan/{id_pengaduan}", form, conf)
        .then((response) => {
          if (response.data.success){
             this.$bvToast.hide("loadingToast");
             this.message = response.data.message;
             this.$bvToast.show("message");
             this.pengaduan = response.data.data.pengaduan;
             this.tanggapan = response.data.data.tanggapan;
             this.rows = response.data.data.count;
             this.getData();
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan tanggapan";
            this.$bvToast.show("message");
          }}
          )
          .catch((error) => {
            console.log(error);
          } )
          },

      generateReport (id) {
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      this.axios.get("/pengaduan/" + id, conf)
        .then(response => {
          if (response.data.success == true){
             this.$bvToast.hide("loadingToast");
             this.reportp = response.data.data.pengaduan[0];
             this.reports = response.data.data.pengaduan[0].user;
             this.reportt = response.data.data.pengaduan[0].tanggapan;
             this.reportk = response.data.data.pengaduan[0].kategori;
             this.$refs.html2Pdf.generatePdf()
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan data pengaduan";
            this.$bvToast.show("message");
            this.$router.push({name: "login"})
          }}
          )
          .catch((error) => {
            console.log(error.response.data.message);
          } )
  },
 
  },

  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
    
  }
}
</script>
<style scoped>


body {
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				text-align: center;
				color: #777;
        /* background-color: #fff; */

			}



			body h1 {
				font-weight: 300;
				margin-bottom: 0px;
				padding-bottom: 0px;
				color: #000;
			}

			body h3 {
				font-weight: 300;
				margin-top: 10px;
				margin-bottom: 20px;
				font-style: italic;
				color: #555;

			}

			body a {
				color: #06f;
			}

			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
        background-color: #fff;
          
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
				border-collapse: collapse;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}
</style>