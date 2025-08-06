-- CreateTable
CREATE TABLE "Email" (
    "datetime" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "application" TEXT NOT NULL DEFAULT 'app',
    "recipient" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "attachment" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL DEFAULT 1,
    "productId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Email_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EditProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pdf" (
    "datetime" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "template" TEXT NOT NULL,
    CONSTRAINT "Pdf_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EditProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Pdf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ftp" (
    "datetime" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "server" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    CONSTRAINT "Ftp_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EditProduct" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Ftp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Version" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "version" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "lastlogin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role" ("desc") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "desc" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "datetime" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "route" TEXT NOT NULL,
    CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '#',
    "parrentMenuId" INTEGER,
    "svg" TEXT NOT NULL DEFAULT '',
    "order" INTEGER,
    "permit" TEXT NOT NULL DEFAULT 'USER',
    CONSTRAINT "Menu_parrentMenuId_fkey" FOREIGN KEY ("parrentMenuId") REFERENCES "Menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeltaSec" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "class" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PreviLocalita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL,
    "stringa" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PreviLocalitaVerifica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PreviCielo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PreviGrafiche" (
    "storico" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "dataora" DATETIME NOT NULL,
    "localitaId" INTEGER NOT NULL,
    "cieloId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PreviGrafiche_cieloId_fkey" FOREIGN KEY ("cieloId") REFERENCES "PreviCielo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreviGrafiche_localitaId_fkey" FOREIGN KEY ("localitaId") REFERENCES "PreviLocalita" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreviGrafiche_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PreviTesti" (
    "storico" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "dataora" DATETIME NOT NULL,
    "testo" TEXT NOT NULL,
    "localitaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PreviTesti_localitaId_fkey" FOREIGN KEY ("localitaId") REFERENCES "PreviLocalita" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreviTesti_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "codice" TEXT NOT NULL,
    "descrizione" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "typeIdId" INTEGER NOT NULL,
    CONSTRAINT "Model_typeIdId_fkey" FOREIGN KEY ("typeIdId") REFERENCES "ModelType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ModelRun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ModelRunRel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelId" INTEGER NOT NULL,
    "modelRunId" INTEGER NOT NULL,
    "maxStep" INTEGER NOT NULL,
    CONSTRAINT "ModelRunRel_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelRunRel_modelRunId_fkey" FOREIGN KEY ("modelRunId") REFERENCES "ModelRun" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ModelType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ModelDomain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelVar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelVarCum" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelStep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "end" INTEGER NOT NULL,
    "start" INTEGER NOT NULL,
    "step" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelRelations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelId" INTEGER NOT NULL,
    "modelDomainId" INTEGER NOT NULL,
    "modelLevelId" INTEGER NOT NULL,
    "modelVarId" INTEGER NOT NULL,
    "modelStepId" INTEGER NOT NULL,
    "modelVarCumId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ModelRelations_modelDomainId_fkey" FOREIGN KEY ("modelDomainId") REFERENCES "ModelDomain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelRelations_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelRelations_modelLevelId_fkey" FOREIGN KEY ("modelLevelId") REFERENCES "ModelLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelRelations_modelStepId_fkey" FOREIGN KEY ("modelStepId") REFERENCES "ModelStep" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelRelations_modelVarCumId_fkey" FOREIGN KEY ("modelVarCumId") REFERENCES "ModelVarCum" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelRelations_modelVarId_fkey" FOREIGN KEY ("modelVarId") REFERENCES "ModelVar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ModelProbLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "codice" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelProbLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelProbVar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelProbStep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "step" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ModelProbRelations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelId" INTEGER NOT NULL,
    "modelLevelId" INTEGER NOT NULL,
    "modelVarId" INTEGER NOT NULL,
    "modelStepId" INTEGER NOT NULL,
    "statistic" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "ModelProbRelations_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelProbRelations_modelLevelId_fkey" FOREIGN KEY ("modelLevelId") REFERENCES "ModelProbLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelProbRelations_modelStepId_fkey" FOREIGN KEY ("modelStepId") REFERENCES "ModelProbStep" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ModelProbRelations_modelVarId_fkey" FOREIGN KEY ("modelVarId") REFERENCES "ModelProbVar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Poor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "PoorPercent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "poorId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    CONSTRAINT "PoorPercent_poorId_fkey" FOREIGN KEY ("poorId") REFERENCES "Poor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Radar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "ente" TEXT,
    "order" INTEGER,
    "path" TEXT
);

-- CreateTable
CREATE TABLE "RadarProd" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RadarRelations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "radarId" INTEGER NOT NULL,
    "radarProdId" INTEGER NOT NULL,
    CONSTRAINT "RadarRelations_radarId_fkey" FOREIGN KEY ("radarId") REFERENCES "Radar" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RadarRelations_radarProdId_fkey" FOREIGN KEY ("radarProdId") REFERENCES "RadarProd" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Satellite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "order" INTEGER,
    "path" TEXT
);

-- CreateTable
CREATE TABLE "SatelliteProd" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "descrizione" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Pseudosondaggi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "runs" TEXT NOT NULL DEFAULT '00,12',
    "order" INTEGER,
    "path" TEXT
);

-- CreateTable
CREATE TABLE "PseudosondaggiLocalita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "pseudosondaggiId" INTEGER NOT NULL,
    CONSTRAINT "PseudosondaggiLocalita_pseudosondaggiId_fkey" FOREIGN KEY ("pseudosondaggiId") REFERENCES "Pseudosondaggi" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meteogrammi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL,
    "order" INTEGER,
    "path" TEXT
);

-- CreateTable
CREATE TABLE "MeteogrammiLocalita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "meteogrammiId" INTEGER NOT NULL,
    CONSTRAINT "MeteogrammiLocalita_meteogrammiId_fkey" FOREIGN KEY ("meteogrammiId") REFERENCES "Meteogrammi" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EditProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "descrizione" TEXT NOT NULL DEFAULT '',
    "archivePath" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "EditEmail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EditEmailProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "emailId" INTEGER NOT NULL,
    CONSTRAINT "EditEmailProduct_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "EditEmail" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EditEmailProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "EditProduct" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EditExtrasondaggio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oggetto" TEXT NOT NULL,
    "from" TEXT NOT NULL DEFAULT '',
    "userId" INTEGER NOT NULL,
    "chiede" TEXT NOT NULL DEFAULT '',
    "firma" TEXT NOT NULL DEFAULT '',
    "responsabile" TEXT NOT NULL DEFAULT '',
    "visti" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "EditExtrasondaggio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MonitorProduct" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "descrizione" TEXT NOT NULL,
    "order" INTEGER,
    "token" TEXT NOT NULL DEFAULT 'lRs920R413'
);

-- CreateTable
CREATE TABLE "MonitorProductHistory" (
    "datetime" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "run" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    CONSTRAINT "MonitorProductHistory_code_fkey" FOREIGN KEY ("code") REFERENCES "MonitorProduct" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Version_version_key" ON "Version"("version");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_desc_key" ON "Role"("desc");

-- CreateIndex
CREATE UNIQUE INDEX "PreviLocalita_desc_key" ON "PreviLocalita"("desc");

-- CreateIndex
CREATE UNIQUE INDEX "PreviLocalitaVerifica_desc_key" ON "PreviLocalitaVerifica"("desc");

-- CreateIndex
CREATE UNIQUE INDEX "PreviCielo_desc_key" ON "PreviCielo"("desc");

-- CreateIndex
CREATE INDEX "PreviGrafiche_dataora_idx" ON "PreviGrafiche"("dataora");

-- CreateIndex
CREATE INDEX "PreviTesti_dataora_idx" ON "PreviTesti"("dataora");

-- CreateIndex
CREATE UNIQUE INDEX "Model_codice_key" ON "Model"("codice");

-- CreateIndex
CREATE UNIQUE INDEX "ModelDomain_name_key" ON "ModelDomain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelLevel_name_key" ON "ModelLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelVar_name_key" ON "ModelVar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelVarCum_name_key" ON "ModelVarCum"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelRelations_modelId_modelDomainId_modelLevelId_modelVarId_modelStepId_modelVarCumId_key" ON "ModelRelations"("modelId", "modelDomainId", "modelLevelId", "modelVarId", "modelStepId", "modelVarCumId");

-- CreateIndex
CREATE UNIQUE INDEX "ModelProbLocation_name_key" ON "ModelProbLocation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelProbLevel_name_key" ON "ModelProbLevel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelProbVar_name_key" ON "ModelProbVar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModelProbRelations_modelId_modelLevelId_modelVarId_modelStepId_statistic_key" ON "ModelProbRelations"("modelId", "modelLevelId", "modelVarId", "modelStepId", "statistic");

-- CreateIndex
CREATE UNIQUE INDEX "Poor_name_key" ON "Poor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PoorPercent_poorId_value_key" ON "PoorPercent"("poorId", "value");

-- CreateIndex
CREATE UNIQUE INDEX "RadarRelations_radarId_radarProdId_key" ON "RadarRelations"("radarId", "radarProdId");

-- CreateIndex
CREATE UNIQUE INDEX "EditEmailProduct_productId_emailId_key" ON "EditEmailProduct"("productId", "emailId");
