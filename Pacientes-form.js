var tablaPaciente = localStorage.getItem('tablaPacienteSrorage');
tablaPaciente = JSON.parse(tablaPaciente);
if (tablaPaciente == null) {
  var tablaPaciente = [];
}

var idForm = localStorage.getItem('idForm');
idForm = JSON.parse(idForm);
if (idForm == null) {
  var idForm = 0;
}

cargarPagina();

function guardar() {
  Swal.fire({
    title: 'GUARDAR',
    html: 'DESEA GUARDAR LOS CAMBIOS?',
    showDenyButton: true,
    confirmButtonText: 'SI',
    denyButtonText: 'NO',
  }).then((result) => {
    if (result.isConfirmed) {
      
      var objPaciente = JSON.stringify({
        idPaciente: idForm > 0 ? idForm : tablaPaciente.length + 1,
        nombreApellido: document.getElementById('txtNombre').value,
        cedula: document.getElementById('txtCc').value,
        telefono: document.getElementById('txtTel').value,
        direccion: document.getElementById('txtDireccion').value,
        estado: document.getElementById('cboEstado').value,
      });
      console.log(objPaciente);
      //EDITAR PACIENTES
      if (idForm > 0) {
        for (const i in tablaPaciente) {
          var varPaciente = JSON.parse(tablaPaciente[i]);
          if (varPaciente.idPaciente == idForm) {
            tablaPaciente[i] = objPaciente;
            break;
          }
        }
      } else {
        //NUEVOS PACIENTES
        tablaPaciente.push(objPaciente);
      }
      localStorage.setItem(
        'tablaPacienteSrorage',
        JSON.stringify(tablaPaciente)
      );

      Swal.fire('Cambios Guardados','','success').then(
        (result)=>{
          window.location.replace('index.html'); 
        }
      );
      
      
    }else if (result.isDenied){
      Swal.fire('CAMBIOS NO GUARDADOS','','info');
  }   
  });
}

function cargarPagina() {
  if (idForm > 0) {
    //SACAR DATOS DE LA FILA DE LA TABLLA Y LLENAR EL FORMULARIO
    for (const i in tablaPaciente) {
      var varPaciente = JSON.parse(tablaPaciente[i]);
      if (varPaciente.idPaciente == idForm) {
        document.getElementById('txtIdPaciente').value = varPaciente.idPaciente;
        document.getElementById('txtNombre').value = varPaciente.nombreApellido;
        document.getElementById('txtCc').value = varPaciente.cedula;
        document.getElementById('txtTel').value = varPaciente.telefono;
        document.getElementById('txtDireccion').value = varPaciente.direccion;
        document.getElementById('cboEstado').value = varPaciente.estado;
        break;
      }
    }
  }
}
