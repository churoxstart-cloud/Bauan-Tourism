from django.core.management.base import BaseCommand

from core.models import Resort

RESORTS = [
    # (owner_name, establishment_name, contact_number, barangay)
    ("Nene Butardo", "Sheik and Grace Beach Resort", "09369548206", "Sampaguita"),
    ("Florencio Gonzalbo", "Endless Summer Beach Resort", "09564210104", "Sampaguita"),
    ("Zenith Dalawampu", "Pamana Beach Resort", "09368922217", "Sampaguita"),
    ("Vivian Dalawampu", "Debbie and Khrys Beach Resort", "09278210836", "Sampaguita"),
    ("Melanie Dalawampu", "Rosemund Beach Resort", "09153755739", "Sampaguita"),
    ("Marites Dalawampu", "Dalawampu Beach Resort", "09662394274", "Sampaguita"),
    ("Eduardo Marasigan", "Sampaguita Beach Resort", "09161296703", "Sampaguita"),
    ("Evelyn Palomares", "CRC Beach Resort", "09459918642", "Sampaguita"),
    ("Michelle Magboo", "Feliza Beach Resort", "09505598694", "Sampaguita"),
    ("Roel Medrano", "Señora Elena Beach Resort", "09159551287", "Sampaguita"),
    ("Louie Bernardo", "Destino Beach Club Resort", "09970917448", "Sampaguita"),
    ("Gaudencio Catapang", "Nangkaan Seaside Hotel Beach Resort", "09633512347", "Sampaguita"),
    ("Jessica Macasib", "OIA Hotel and Beach Resort", "09282424002", "Sampaguita"),
    ("Imee Dalawampu", "Buena Herencia", "09458435510", "Sampaguita"),
    ("Clarito Villanueva", "Ara Beach Resort", "09397155946", "Sampaguita"),
    ("Clarito Villanueva", "Il Sogno Beach Resort", "09397155946", "Sampaguita"),
    ("Marinelle C. Favis", "Verandah Resort Hotel", "09177901120", "Sampaguita"),

    ("Felipe Maramot", "La Thalia Beach Resort", "09278762406", "La Liga Locloc"),
    ("Aileen Maranan", "Alexis Beach Resort", "09162038624", "La Liga Locloc"),
    ("Analiza Castillo", "Castillong Buhangin Beach Resort", "09260231200", "La Liga Locloc"),
    ("Rolly Bautista", "N-Yorker's Beach Resort", "09152709587", "La Liga Locloc"),
    ("Atty. Mario Bejer", "Sadayo Beach Resort", "09664404441", "La Liga Locloc"),
    ("Remedious De Villa", "Dinoy's Beach Resort", "09454612124", "La Liga Locloc"),

    ("Arlyn Enriquez", "Dive and Trek Hotel and Beach Resort", "09195733999", "San Pablo"),
    ("Mary Jane Ong", "I Jam Glam and Dive Resort", "09956337068", "San Pablo"),
    ("Emmanuel Garces", "Binukbok View Point Beach Resort", "09559473813", "San Pablo"),
    ("Carmela Sevilla", "Portulano Hotel and Beach Resort", "09064338032", "San Pablo"),
    ("Precy Vergara", "Arcadia Beach Resort", "09165304484", "San Pablo"),
    ("Mercedes D. De la Luna", "Natstep Beach Resort", "09178034952", "San Pablo"),
    ("Yan Combate", "Sunsetview Dive and Beach Resort", "09559433818", "San Pablo"),
    ("Leo Paul R. Rico", "Tranquility Camp Private Resort", "09683725589", "San Pablo"),
    ("Egbert Puzalan", "Penta Bros Incorporated", "09067683738", "San Pablo"),
    ("Diane Sheila Salvador", "Sikaeom Camp and Dive Resort", "09155503837", "San Pablo"),

    ("Jericho D. Bautista", "Tampisaw Resort", "0909-5163288", "Urban Areas"),
    ("Jenelyn Maranan Cortes", "Maranan Resort", "0908-1486925", "Urban Areas"),
    ("Jessica P. Macasieb", "Macpan Seascape Property Resort Corp.", "0917-8106972", "Urban Areas"),
    ("Evangeline A. Manalo", "Honoria's Resort, Events And Training Center", "0927-2621272", "Urban Areas"),
    ("Ma. Imelda R. Sarrol", "Villa Ferlin Resort Company", "0906-2106878", "Urban Areas"),
    ("Torres Rosalinda", "Rosana Beach Resort", "727-3431", "Urban Areas"),
    ("Sonia A. Alegria", "Alegria Hotel", "0932-8705698", "Urban Areas"),
    ("Adventureland International Leisure Corp.", "Bauan Plaza Hotel Resort And Leisure Corporation", "0917-8300594", "Urban Areas"),
    ("Jelian Casapao", "Bauan Traveler's Hotel Corporation", "0917-6802568", "Urban Areas"),
    ("Dhez Carbonel", "D Midland Pacific Hotel Batangas Corporation", "0908-8108761", "Urban Areas"),
    ("Mario M. Brucal", "Bauan-Lodge", "727-1399", "Urban Areas"),
    ("Sandy Magboo Gonzales", "Good Morning Lodge", "0917-2400576", "Urban Areas"),
    ("Sir Frederick Saulog Sarrol", "Lavander Inn", "0905-4896334", "Urban Areas"),
    ("Joshua Philip G. Cayao", "Sotogrande Batangas Hotel", "09695980019", "Urban Areas"),
]


class Command(BaseCommand):
    help = "Load the official MTO list of Bauan tourism establishments as Resort records."

    def handle(self, *args, **options):
        created, skipped = 0, 0
        for owner_name, name, contact_number, barangay in RESORTS:
            obj, was_created = Resort.objects.get_or_create(
                name=name,
                defaults={
                    "owner_name": owner_name,
                    "contact_number": contact_number,
                    "barangay": barangay,
                    "status": "active",
                },
            )
            if was_created:
                created += 1
            else:
                skipped += 1

        self.stdout.write(self.style.SUCCESS(f"Created {created} resorts, skipped {skipped} (already existed)."))