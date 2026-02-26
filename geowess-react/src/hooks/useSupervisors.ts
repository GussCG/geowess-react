import { useState, useEffect } from "react";
import { userService } from "../services/user.service";

interface Supervisor {
  id: any;
  nombre: any;
  ap_paterno: any;
  ap_materno: any;
  usuario_rol: Array<{
    rol: {
      nombre: string;
    };
  }>;
}

export const useSupervisors = () => {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        setLoading(true);
        const data = await userService.getUsersByRole("supervisor");
        setSupervisors(data as unknown as Supervisor[]);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  return { supervisors, loading, error };
};
