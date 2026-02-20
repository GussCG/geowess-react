import { useState } from "react";
import Section from "../../../../components/Layout/Section";
import Icons from "../../../../components/Others/IconProvider";

const { IoMdNotifications, FaRegCircleCheck } = Icons;

interface ActivityFeedProps {
  notifications?: {
    id: string;
    titulo: string;
    descripcion: string;
    visto: boolean;
    usuario_id: string;
    created_at: string;
  }[];
}

export default function ActivityFeed({ notifications }: ActivityFeedProps) {
  //   const sortedNotifications = notifications
  //     ? [...notifications].sort(
  //         (a, b) =>
  //           new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  //       )
  //     : [];

  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  //   Datos de prueba para desarrollo
  const sortedNotifications = [
    {
      id: "1",
      titulo: "Nuevo proyecto creado",
      descripcion: "Se ha creado el proyecto 'Construcción de Edificio A'",
      visto: true,
      usuario_id: "123",
      created_at: "2024-06-01",
    },
    {
      id: "2",
      titulo: "Estimación aprobada",
      descripcion:
        "La estimación para el proyecto 'Carretera B' ha sido aprobada",
      visto: false,
      usuario_id: "123",
      created_at: "2024-06-02",
    },
    {
      id: "3",
      titulo: "Nuevo proyecto creado",
      descripcion: "Se ha creado el proyecto 'Construcción de Edificio A'",
      visto: true,
      usuario_id: "123",
      created_at: "2024-06-01",
    },
    {
      id: "4",
      titulo: "Estimación aprobada",
      descripcion:
        "La estimación para el proyecto 'Carretera B' ha sido aprobada",
      visto: false,
      usuario_id: "123",
      created_at: "2024-06-02",
    },
  ];

  const filteredNotifications = showUnreadOnly
    ? sortedNotifications.filter((notif) => !notif.visto)
    : sortedNotifications;

  return (
    <Section variant="list" title="Actividad Reciente">
      <div className="filter-header">
        <label className="filter-switch">
          <div className="switch-container">
            <input
              type="checkbox"
              className="switch-input"
              checked={showUnreadOnly}
              onChange={() => setShowUnreadOnly(!showUnreadOnly)}
            />
            <span className="slider"></span>
          </div>
          <span className="switch-label">Solo no leídas</span>
        </label>
      </div>

      <ul className="activity-feed">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div className="activity-item" key={notif.id}>
              <div className="activity-icon">
                <span className={`status-dot ${notif.visto ? "" : "unread"}`}>
                  {notif.visto ? <FaRegCircleCheck /> : <IoMdNotifications />}
                </span>
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-title">{notif.titulo}</span>
                  <span className="activity-time">
                    {new Date(notif.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="activity-desc">{notif.descripcion}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No hay actividad reciente.</p>
        )}
      </ul>
    </Section>
  );
}
