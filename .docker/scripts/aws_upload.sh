# CDN and statics
S3_BUCKET ?= s3://scm-milanuncios-frontend-pre/
S3_BUCKET_PET ?= $(S3_BUCKET)pet/

FIVE_MINUTES_CACHE=300
ONE_YEAR_CACHE=31536000

ASSET_MANIFEST="asset-manifest.json"
MANIFEST="manifest.json"
ROBOTS="robots.txt"
INDEX_HTML="index.html"
404_HTML="404.html"
500_HTML="500.html"
SERVICE_WORKER="service-worker.js"

time aws s3 sync public/. $(S3_BUCKET_PET) --region eu-west-3 --include '*' --exclude $(MANIFEST) --exclude $(ASSET_MANIFEST) --exclude $(SERVICE_WORKER) --exclude $(INDEX_HTML) --exclude $(500_HTML) --exclude $(404_HTML) --cache-control max-age=$(ONE_YEAR_CACHE)
time aws s3 cp public/$(ASSET_MANIFEST) $(S3_BUCKET_PET)$(ASSET_MANIFEST)
time aws s3 cp public/$(INDEX_HTML) $(S3_BUCKET_PET)$(INDEX_HTML)
time aws s3 cp public/$(404_HTML) $(S3_BUCKET_PET)$(404_HTML)
time aws s3 cp public/$(500_HTML) $(S3_BUCKET_PET)$(500_HTML)
time aws s3 cp public/$(MANIFEST) $(S3_BUCKET)$(MANIFEST) --content-type='application/json' --cache-control max-age=$(FIVE_MINUTES_CACHE) --metadata-directive REPLACE
