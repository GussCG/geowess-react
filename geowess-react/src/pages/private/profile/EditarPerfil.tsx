import { useAuth } from "../../../hooks/useAuth";
import { useUserContext } from "../../../context/User/UserContext";
import ProfileForm from "../../../components/Layout/ProfileForm";
import Loader from "../../../components/Others/Loader";

function EditarPerfil() {
  const {
    handleUpdateProfile,
    loading: updating,
    error: authError,
  } = useAuth();
  const { user, profile, role, loading: loadingContext } = useUserContext();
  const isOAuthUser = user?.app_metadata?.provider !== "email";

  if (loadingContext || !profile) {
    return <Loader message="Cargando perfil..." />;
  }

  return (
    <div className=" page profile-page">
      <h2 className="page-title">Editar Perfil</h2>
      <ProfileForm
        defaultValues={{ ...profile, rol: role }}
        onSubmit={async (data) => {
          await handleUpdateProfile(profile.id, data);
        }}
        loading={updating}
        isEditMode
        isOAuthUser={isOAuthUser}
      />
    </div>
  );
}

export default EditarPerfil;
