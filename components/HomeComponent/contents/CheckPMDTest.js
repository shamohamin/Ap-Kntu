
module.exports = `

/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
*/
package ir.ac.kntu.style ;

import net.sourceforge.pmd.PM ;
import net.sourceforge.pmd.PMDConfiguratio ;
import org.junit.Asser ;
import org.junit.Tes ;

import java.io.Fil ;
import java.util.ArrayList ;
import java.util.Lis ;
import java.util.stream.Collector ;

/**
* 2 points
*/
public class CheckPMDTest {

   @Test
   public void testPMD() {

       /*
        * Files
        */
       File ROOT = new File( "src/main/" ) ;
       System.out.println( "RootIsSetTo" + ROOT.getAbsolutePath() + "." ) ;

       List<File> files = new ArrayList<>() ;
       listFiles(files, ROOT, "java" ) ;
       System.out.println( "Found " + files.size() + " Java source files." ) ;

       PMDConfiguration pmdConfiguration = new PMDConfiguration() ;
       pmdConfiguration.setRuleSets( "category/java/bestpractices.xml/DefaultLabelNotLastInSwitchStmt,"
               + "category/java/design.xml/ExcessiveMethodLength,"
               + "category/java/errorprone.xml/UseEqualsToCompareStrings,"
               + "category/java/errorprone.xml/CloseResource") ;


       String collect = files.stream()
               .map(f -> f.getPath())
               .collect(Collectors.joining( "," )) ;
       pmdConfiguration.setInputPaths(collect) ;
       pmdConfiguration.setReportFormat( "text" ) ;
       int violations = PMD.doPMD(pmdConfiguration) ;
       System.out.println( "violations= " + violations) ;
       Assert.assertTrue( "NoVilationInResourceClosing", violations == 0) ;
       System.err.println( "$$$GRADER$$$|{type:SCORE,amount:2,reason:PMD.}|$$$GRADER$$$" ) ;
   }

   
   private static void listFiles(List<File> files, File folder, String extension) {
       if (folder.canRead()) {
           if (folder.isDirectory()) {
               for (File f : folder.listFiles()) {
                   listFiles(files, f, extension) ;
               }
           } else if (folder.toString().endsWith( "." + extension)) {
               files.add(folder) ;
           }
       }
   }
}`