// rol-api.js - Funcionalidad para gestión de roles utilizando API

// Configuración de la API
const API_BASE_URL = "http://localhost:5150/api";

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar DataTable
    const table = $('#add-row').DataTable({
        destroy: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json'
        },
        columns: [
            { data: 'name' },
            { data: 'description' },
            { 
                data: 'status',
                render: function(data) {
                    return data === 1 ? 
                        '<span class="badge bg-success">Activo</span>' : 
                        '<span class="badge bg-danger">Inactivo</span>';
                }
            },
            {
                data: null,
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <div class="form-button-action">
                            <button type="button" class="btn btn-sm btn-warning edit-btn">
                                Editar <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-danger delete-btn">
                                Eliminar <i class="fa fa-times"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ]
    });

    // Cargar roles al iniciar
    loadRoles();

    // Event Listeners para botones de editar en la tabla
    $('#add-row tbody').on('click', '.edit-btn', function () {
        const data = table.row($(this).closest('tr')).data();
        
        // Llenar el formulario con los datos
        $('#Id').val(data.id);
        $('#addName').val(data.name);
        $('#addDescription').val(data.description);
        $('#addStatus').val(data.status);
        
        // Cambiar el título del modal y el texto del botón
        $('.modal-title').html('<span class="fw-mediumbold">Editar</span> <span class="fw-light">Rol</span>');
        $('#addRowButton').text('Actualizar');
        
        // Mostrar el modal
        $('#addRowModal').modal('show');
    });

    // Event Listeners para botones de eliminar en la tabla
    $('#add-row tbody').on('click', '.delete-btn', function () {
        const data = table.row($(this).closest('tr')).data();
        
        if (confirm('¿Está seguro de eliminar este rol?')) {
            deleteRole(data.id);
        }
    });

    // Evento para abrir el modal de agregar
    $('button[data-bs-target="#addRowModal"]').on('click', function() {
        // Limpiar el formulario
        resetForm('roleForm');
        
        // Cambiar título y botón
        $('.modal-title').html('<span class="fw-mediumbold">Agregar</span> <span class="fw-light">Rol</span>');
        $('#addRowButton').text('Agregar');
    });

    // Evento para guardar/actualizar rol
    $('#addRowButton').on('click', function () {
        if (!validateForm('roleForm')) {
            showNotification('Por favor, completa todos los campos requeridos.', 'danger');
            return;
        }
        saveRole();
    });
});

// Función para cargar roles desde la API
function loadRoles() {
    fetch(`${API_BASE_URL}/Rol`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron cargar los roles');
            }
            return response.json();
        })
        .then(data => {
            const table = $('#add-row').DataTable();
            table.clear();
            table.rows.add(data);
            table.draw();
        })
        .catch(error => {
            showNotification('Error al cargar roles: ' + error.message, 'danger');
        });
}

// Función para eliminar un rol
function deleteRole(roleId) {
    fetch(`${API_BASE_URL}/Rol/${roleId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el rol');
        }
        return response.json();
    })
    .then(() => {
        showNotification('Rol eliminado con éxito');
        loadRoles(); // Recargar datos después de eliminar
    })
    .catch(error => {
        showNotification('Error: ' + error.message, 'danger');
    });
}

// Función para guardar/actualizar rol
function saveRole() {
    const roleId = $('#Id').val();
    const roleData = {
        id: roleId ? parseInt(roleId) : 0,
        name: $('#addName').val().trim(),
        description: $('#addDescription').val().trim(),
        status: parseInt($('#addStatus').val()),
    };

    // Según el Swagger, usar /api/Rol para POST (crear) y /api/Rol/update para PUT (actualizar)
    const url = roleId ? `${API_BASE_URL}/Rol/update` : `${API_BASE_URL}/Rol`;
    const method = roleId ? 'PUT' : 'POST';

    console.log("ID del rol:", roleId);
    console.log("Datos a enviar:", roleData);
    console.log("Método:", method);
    console.log("URL:", url);

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData),
    })
    .then(response => {
        console.log("Código de estado:", response.status);
        if (!response.ok) {
            throw new Error('Error al guardar el rol');
        }
        return response.json();
    })
    .then(() => {
        $('#addRowModal').modal('hide');
        showNotification(roleId ? 'Rol actualizado con éxito' : 'Rol creado con éxito');
        loadRoles(); // Recargar datos después de guardar
        resetForm('roleForm'); // Limpiar formulario
    })
    .catch(error => {
        console.error("Error completo:", error);
        showNotification('Error: ' + error.message, 'danger');
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const cardBody = document.querySelector('.card-body');
    cardBody.insertBefore(alertDiv, cardBody.firstChild);

    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150);
    }, 3000);
}

// Función para validar formulario
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    // Validación básica - comprueba los campos required
    const nameField = document.getElementById('addName');
    const descField = document.getElementById('addDescription');
    
    if (!nameField.value.trim() || !descField.value.trim()) {
        if (!nameField.value.trim()) nameField.classList.add('is-invalid');
        if (!descField.value.trim()) descField.classList.add('is-invalid');
        return false;
    }
    
    return true;
}

// Función para resetear formulario
function resetForm(formId) {
    document.getElementById(formId).reset();
    
    // Quitar clases de validación
    const inputs = document.getElementById(formId).querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
    
    // Limpiar ID oculto
    $('#Id').val('');
}