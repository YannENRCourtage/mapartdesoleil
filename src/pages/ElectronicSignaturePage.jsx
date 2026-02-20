import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { CheckCircle, FileText, Download, Eraser, PenSquare } from 'lucide-react';
import { allProjects } from '@/data/projects';
import { mockApplications } from '@/data/mockData';

const SignaturePad = ({ title, onSign, signatureRef }) => {
  const [isSigned, setIsSigned] = useState(false);
  
  const clearSignature = () => {
    signatureRef.current.clear();
    setIsSigned(false);
    onSign(false);
  };
  
  const handleEndStroke = () => {
    if (!signatureRef.current.isEmpty()) {
      setIsSigned(true);
      onSign(true);
    } else {
      setIsSigned(false);
      onSign(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="border bg-gray-50 rounded-lg relative">
        <SignatureCanvas
          ref={signatureRef}
          penColor='black'
          canvasProps={{ className: 'w-full h-40 rounded-lg' }}
          onEnd={handleEndStroke}
        />
        {isSigned && <CheckCircle className="absolute top-2 right-2 text-green-500" />}
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={clearSignature}><Eraser className="w-4 h-4 mr-2" />Effacer</Button>
      </div>
    </div>
  );
};

const ElectronicSignaturePage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const application = mockApplications.find(app => app.id === applicationId);
  const project = application ? allProjects.find(p => p.id === application.projects[0].projectId) : null;
  
  const contractSignRef = useRef(null);
  const sepaSignRef = useRef(null);

  const [isContractSigned, setIsContractSigned] = useState(false);
  const [isSepaSigned, setIsSepaSigned] = useState(false);

  const handleFinalize = () => {
    if (!isContractSigned || !isSepaSigned) {
      toast({ title: "Signature incomplète", description: "Veuillez signer les deux documents.", variant: "destructive" });
      return;
    }
    toast({ title: "Adhésion finalisée !", description: "Merci ! Vos signatures ont été enregistrées avec succès.", className: "bg-green-100 text-green-900 border-green-200" });
    navigate('/mes-projets');
  };

  if (!application || !project) {
    return <div>Demande non trouvée.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Signature Électronique - Ma part de soleil</title>
        <meta name="description" content="Signez électroniquement votre contrat de participation et votre mandat SEPA pour finaliser votre adhésion." />
      </Helmet>

      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Signature Électronique</h1>
          <p className="text-muted-foreground mb-8">Finalisez votre adhésion au projet <span className="font-semibold text-primary">{project.name}</span> en signant les documents.</p>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" />Contrat d'adhésion</CardTitle>
                <CardDescription>Lisez le contrat puis apposez votre signature ci-dessous.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <Button variant="outline" className="mb-4 w-full"><Download className="w-4 h-4 mr-2" />Télécharger le contrat (PDF)</Button>
                <SignaturePad title="Contrat" onSign={setIsContractSigned} signatureRef={contractSignRef} />
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><PenSquare className="w-5 h-5 text-primary" />Mandat SEPA</CardTitle>
                <CardDescription>Signez le mandat pour autoriser les prélèvements futurs.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <Button variant="outline" className="mb-4 w-full"><Download className="w-4 h-4 mr-2" />Télécharger le mandat SEPA (PDF)</Button>
                <SignaturePad title="SEPA" onSign={setIsSepaSigned} signatureRef={sepaSignRef} />
              </CardContent>
            </Card>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-8">
            <Button onClick={handleFinalize} size="lg" disabled={!isContractSigned || !isSepaSigned}>
              <CheckCircle className="mr-2 h-5 w-5" />Confirmer et finaliser mon adhésion
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ElectronicSignaturePage;