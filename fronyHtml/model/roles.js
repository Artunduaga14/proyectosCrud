// Variables globales
let roleTable;
let roleToDelete = null;

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar DataTable
    roleTable = $('#roles-table').DataTable({
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
                render: function(data) {
                    return `
                        <div class="form-button-action">
                            <button type="button" data-id="${data.id}" class="btn btn-link btn-primary btn-edit" title="Editar">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" data-id="${data.id}" class="btn btn-link btn-danger btn-delete" title="Eliminar">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ]
    });

    // Cargar datos de roles
    loadRoles();

    // Event listeners
    // Agregar rol
    document.getElementById('addRoleButton').addEventListener('click', createRole);
    
    // Actualizar rol
    document.getElementById('updateRoleButton').addEventListener('click', updateRole);
    
    // Confirmar eliminación
    document.getElementById('confirmDeleteButton').addEventListener('click', deleteRole);
    
    // Botón editar rol (evento delegado)
    $('#roles-table').on('click', '.btn-edit', function() {
        const id = $(this).data('id');
        openEditModal(id);
    });
    
    // Botón eliminar rol (evento delegado)
    $('#roles-table').on('click', '.btn-delete', function() {
        const id = $(this).data('id');
        openDeleteModal(id);
    });
});

// Cargar todos los roles
async function loadRoles() {
    try {
        const roles = await RolService.getAllRoles();
        roleTable.clear();
        roleTable.rows.add(roles).draw();
    } catch (error) {
        showNotification('Error al cargar los roles: ' + error.message, 'danger');
    }
}

// Crear nuevo rol
async function createRole() {
    const form = document.getElementById('addRoleForm');
    
    // Validar formulario
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    try {
        const roleData = {
            name: document.getElementById('roleName').value,
            description: document.getElementById('roleDescription').value,
            status: parseInt(document.getElementById('roleStatus').value)
        };
        
        await RolService.createRole(roleData);
        
        // Cerrar modal y resetear formulario
        $('#addRoleModal').modal('hide');
        form.reset();
        form.classList.remove('was-validated');
        
        // Refrescar datos y mostrar notificación
        loadRoles();
        showNotification('Rol creado con éxito');
    } catch (error) {
        showNotification('Error al crear el rol: ' + error.message, 'danger');
    }
}

// Abrir modal de edición y cargar datos del rol
async function openEditModal(id) {
    try {
        const role = await RolService.getRoleById(id);
        
        // Llenar formulario con datos del rol
        document.getElementById('editRoleId').value = role.id;
        document.getElementById('editRoleName').value = role.name;
        document.getElementById('editRoleDescription').value = role.description;
        document.getElementById('editRoleStatus').value = role.status;
        
        // Mostrar modal
        $('#editRoleModal').modal('show');
    } catch (error) {
        showNotification('Error al cargar el rol: ' + error.message, 'danger');
    }
}

// Actualizar rol
async function updateRole() {
    const form = document.getElementById('editRoleForm');
    
    // Validar formulario
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    try {
        const id = document.getElementById('editRoleId').value;
        const roleData = {
            id: parseInt(id),
            name: document.getElementById('editRoleName').value,
            description: document.getElementById('editRoleDescription').value,
            status: parseInt(document.getElementById('editRoleStatus').value)
        };
        
        await RolService.updateRole(id, roleData);
        
        // Cerrar modal y resetear formulario
        $('#editRoleModal').modal('hide');
        form.classList.remove('was-validated');
        
        // Refrescar datos y mostrar notificación
        loadRoles();
        showNotification('Rol actualizado con éxito');
    } catch (error) {
        showNotification('Error al actualizar el rol: ' + error.message, 'danger');
    }
}

// Abrir modal de confirmación de eliminación
function openDeleteModal(id) {
    roleToDelete = id;
    $('#deleteConfirmModal').modal('show');
}

// Eliminar rol
async function deleteRole() {
    if (!roleToDelete) return;
    
    try {
        await RolService.deleteRole(roleToDelete);
        
        // Cerrar modal
        $('#deleteConfirmModal').modal('hide');
        
        // Refrescar datos y mostrar notificación
        loadRoles();
        showNotification('Rol eliminado con éxito');
    } catch (error) {
        showNotification('Error al eliminar el rol: ' + error.message, 'danger');
    } finally {
        roleToDelete = null;
    }
}