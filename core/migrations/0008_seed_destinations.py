from django.db import migrations

# The six places already shown in "Popular Attractions" on the public site, with the same
# wording the site uses. Fees, hours and best times are left blank on purpose: the MTO
# fills them in, and until then the bot says they are not posted instead of guessing.
SEED = [
    ("Sampaguita Beach", "beach",
     "A tranquil coastal getaway perfect for swimming, relaxing under the sun, and watching magnificent Batangas sunsets.",
     "Isang tahimik na dalampasigan na perpekto para sa pag-langoy, pagpapahinga, at panonood ng magagandang paglubog ng araw.",
     "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoUixNNq5YaHqj8ihSOM9F49Iew9WniRPC5R64slDy9KAQ5zxMFks_OaqJpt7cfk3MyFL_ox-xhDS2VZD7S_6v0EyPQ3QDIsqxVtTjsMOJNgRnZBnSh56qTXvFqVDvP493KfhpplttO3so/s1600/SAMPAGUITA+BEACH+RESORT+BLOG+REVIEW.png"),
    ("Bauan Marine Sanctuaries", "diving",
     "World-renowned diving zones boasting vibrant coral reefs, sea turtles, and pristine underwater visibility.",
     "Kilalang diving spots na may makukulay na coral reefs, mga pawikan, at malinaw na tubig.",
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_UiL2RC-meAMOTclEAMiF_FY-PDSM5KdAMzjmPiaGpZ3YTbkfLO_K5zNj&s=10"),
    ("Immaculate Conception Parish", "heritage",
     "A historic architectural landmark standing as a proud symbol of Bauan's deep religious and cultural heritage.",
     "Isang makasaysayang simbahan na sumisimbolo sa relihiyoso at kultural na pamana ng Bauan.",
     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/ee/1e/78/caption.jpg?w=1200&h=-1&s=1"),
    ("Bauan Divers Sanctuary", "diving",
     "A protected dive area where divers can enjoy calm waters and healthy marine life close to the shore.",
     "",
     "https://media-cdn.tripadvisor.com/media/photo-s/0c/12/5a/44/bauan-divers-sanctuary.jpg"),
    ("Bauan Dive Spots", "diving",
     "Easy-access dive sites suited to beginners and certified divers, with local operators ready to guide you.",
     "",
     "https://www.dronestagr.am/wp-content/uploads/2017/10/Bauan-Dive.jpg"),
    ("Scenic Bauan Coastline", "nature",
     "Breathtaking sea views and open skies, perfect for a relaxed stroll, photos, and golden sunsets.",
     "",
     "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/1b/f1/8c/simply-breathtaking.jpg?w=600&h=400&s=1"),
]


def seed(apps, schema_editor):
    Destination = apps.get_model("core", "Destination")
    if Destination.objects.exists():
        return                      # never touch data the MTO already entered
    for i, (name, cat, en, tl, photo) in enumerate(SEED, start=1):
        Destination.objects.create(
            name=name, category=cat, description=en, description_tl=tl, photo_url=photo, sort_order=i
        )


def unseed(apps, schema_editor):
    apps.get_model("core", "Destination").objects.filter(name__in=[s[0] for s in SEED]).delete()


class Migration(migrations.Migration):
    dependencies = [("core", "0007_destination_botquestion")]
    operations = [migrations.RunPython(seed, unseed)]
