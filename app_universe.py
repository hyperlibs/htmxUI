#!/usr/bin/env python3
"""
Kosmos 3D — Python Astrophysics & HTMX Hypermedia Server
Computes real-time orbital mechanics, relativistic time dilation, and NASA exoplanet habitability indices.
"""

import math
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse
from typing import Dict, Any

# Planetary & Astrophysics Dataset
COSMIC_DATABASE: Dict[str, Dict[str, Any]] = {
    "sun": {
        "name": "Sun (Sol)",
        "type": "Yellow Dwarf Star (G2V)",
        "mass_kg": 1.989e30,
        "radius_km": 696340,
        "surface_temp_k": 5778,
        "orbit_au": 0.0,
        "semi_major_axis_km": 0,
        "eccentricity": 0.0,
        "habitable_esi": 0.0,
        "description": "The central gravitational anchor of the solar system, fusing 600 million tons of hydrogen per second."
    },
    "mercury": {
        "name": "Mercury",
        "type": "Terrestrial Planet",
        "mass_kg": 3.285e23,
        "radius_km": 2439.7,
        "surface_temp_k": 440,
        "orbit_au": 0.387,
        "semi_major_axis_km": 57.91e6,
        "eccentricity": 0.2056,
        "habitable_esi": 0.39,
        "description": "High-density iron core world experiencing extreme tidal forces from the Sun."
    },
    "venus": {
        "name": "Venus",
        "type": "Terrestrial Planet",
        "mass_kg": 4.867e24,
        "radius_km": 6051.8,
        "surface_temp_k": 737,
        "orbit_au": 0.723,
        "semi_major_axis_km": 108.2e6,
        "eccentricity": 0.0067,
        "habitable_esi": 0.44,
        "description": "Supercritical runaway greenhouse atmosphere with 92 bar surface pressure."
    },
    "earth": {
        "name": "Earth (Terra)",
        "type": "Terrestrial Planet",
        "mass_kg": 5.972e24,
        "radius_km": 6371.0,
        "surface_temp_k": 288,
        "orbit_au": 1.000,
        "semi_major_axis_km": 149.6e6,
        "eccentricity": 0.0167,
        "habitable_esi": 1.00,
        "description": "The golden standard for planetary habitability with dynamic plate tectonics and active magnetosphere."
    },
    "mars": {
        "name": "Mars",
        "type": "Terrestrial Planet",
        "mass_kg": 6.39e23,
        "radius_km": 3389.5,
        "surface_temp_k": 210,
        "orbit_au": 1.524,
        "semi_major_axis_km": 227.9e6,
        "eccentricity": 0.0934,
        "habitable_esi": 0.70,
        "description": "Cold desert world with vast underground ice reserves and ancient river valleys."
    },
    "jupiter": {
        "name": "Jupiter",
        "type": "Gas Giant",
        "mass_kg": 1.898e27,
        "radius_km": 69911,
        "surface_temp_k": 165,
        "orbit_au": 5.204,
        "semi_major_axis_km": 778.5e6,
        "eccentricity": 0.0484,
        "habitable_esi": 0.12,
        "description": "Planetary giant acting as the gravitational shield for the inner solar system."
    },
    "trappist": {
        "name": "TRAPPIST-1e",
        "type": "Exoplanet (Super-Earth)",
        "mass_kg": 4.13e24,
        "radius_km": 5861.0,
        "surface_temp_k": 251,
        "orbit_au": 0.029,
        "semi_major_axis_km": 4.38e6,
        "eccentricity": 0.005,
        "habitable_esi": 0.85,
        "description": "Tidally locked exoplanet in the habitable zone with high probability of liquid surface water."
    },
    "gargantua": {
        "name": "Gargantua",
        "type": "Supermassive Black Hole",
        "mass_kg": 1.989e38,
        "radius_km": 2.95e8,
        "surface_temp_k": 0.000000001,
        "orbit_au": 0.0,
        "semi_major_axis_km": 0,
        "eccentricity": 0.0,
        "habitable_esi": 0.0,
        "description": "Relativistic gravitational singularity with extreme time dilation (1 hr = 7 years on Miller's Planet)."
    }
}

class AstrophysicsEngine:
    G = 6.67430e-11  # m^3 kg^-1 s^-2
    C = 299792458     # m/s

    @staticmethod
    def calculate_orbital_velocity(mass_central_kg: float, distance_m: float) -> float:
        if distance_m <= 0:
            return 0.0
        return math.sqrt((AstrophysicsEngine.G * mass_central_kg) / distance_m) / 1000.0  # km/s

    @staticmethod
    def calculate_escape_velocity(mass_kg: float, radius_km: float) -> float:
        radius_m = radius_km * 1000.0
        if radius_m <= 0:
            return AstrophysicsEngine.C / 1000.0
        v_esc = math.sqrt((2 * AstrophysicsEngine.G * mass_kg) / radius_m) / 1000.0  # km/s
        return min(v_esc, AstrophysicsEngine.C / 1000.0)

    @staticmethod
    def calculate_lorentz_gamma(velocity_kms: float) -> float:
        v = velocity_kms * 1000.0
        if v >= AstrophysicsEngine.C:
            return float('inf')
        return 1.0 / math.sqrt(1.0 - (v**2 / AstrophysicsEngine.C**2))

    @staticmethod
    def calculate_surface_gravity(mass_kg: float, radius_km: float) -> float:
        radius_m = radius_km * 1000.0
        if radius_m <= 0:
            return float('inf')
        return (AstrophysicsEngine.G * mass_kg) / (radius_m**2)


class UniverseHTTPHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Serve JSON Telemetry
        if path.startswith("/api/universe/telemetry/"):
            body_id = path.split("/")[-1].lower()
            data = COSMIC_DATABASE.get(body_id, COSMIC_DATABASE["earth"])
            
            # Compute real-time physics
            sun_mass = COSMIC_DATABASE["sun"]["mass_kg"]
            dist_m = data["semi_major_axis_km"] * 1000.0
            orb_vel = AstrophysicsEngine.calculate_orbital_velocity(sun_mass, dist_m)
            esc_vel = AstrophysicsEngine.calculate_escape_velocity(data["mass_kg"], data["radius_km"])
            surf_g = AstrophysicsEngine.calculate_surface_gravity(data["mass_kg"], data["radius_km"])
            gamma = AstrophysicsEngine.calculate_lorentz_gamma(orb_vel)

            response = {
                "id": body_id,
                "name": data["name"],
                "type": data["type"],
                "mass_kg": f"{data['mass_kg']:.3e}",
                "radius_km": f"{data['radius_km']:,}",
                "orbital_velocity_kms": round(orb_vel, 2),
                "escape_velocity_kms": round(esc_vel, 2),
                "surface_gravity_ms2": round(surf_g, 3),
                "lorentz_gamma": round(gamma, 8),
                "esi_habitability": data["habitable_esi"],
                "description": data["description"]
            }

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        # Serve HTMX Hypermedia Fragment
        if path.startswith("/api/universe/fragment/"):
            body_id = path.split("/")[-1].lower()
            data = COSMIC_DATABASE.get(body_id, COSMIC_DATABASE["earth"])
            sun_mass = COSMIC_DATABASE["sun"]["mass_kg"]
            dist_m = data["semi_major_axis_km"] * 1000.0
            orb_vel = AstrophysicsEngine.calculate_orbital_velocity(sun_mass, dist_m)
            surf_g = AstrophysicsEngine.calculate_surface_gravity(data["mass_kg"], data["radius_km"])

            html = f"""
            <div class="space-y-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-white">{data['name']}</h3>
                <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">{data['type']}</span>
              </div>
              <p class="text-slate-400 text-[11px] leading-relaxed">{data['description']}</p>
              <div class="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2 border-t border-slate-800">
                <div>Velocity: <strong class="text-indigo-400">{orb_vel:.2f} km/s</strong></div>
                <div>Gravity: <strong class="text-emerald-400">{surf_g:.2f} m/s²</strong></div>
                <div>ESI Index: <strong class="text-cyan-400">{data['habitable_esi']}</strong></div>
                <div>Orbit AU: <strong class="text-amber-400">{data['orbit_au']} AU</strong></div>
              </div>
            </div>
            """

            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"Endpoint Not Found")

def run_python_astrophysics_server(port: int = 8000):
    server = HTTPServer(("0.0.0.0", port), UniverseHTTPHandler)
    print(f"🚀 Python Astrophysics & HTMX Backend running on http://localhost:{port}")
    server.serve_forever()

if __name__ == "__main__":
    run_python_astrophysics_server(8000)
